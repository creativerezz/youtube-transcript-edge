// YouTube Transcript Edge API Client

export interface VideoTranscript {
  id: number;
  video_id: string;
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  captions: string;
  timestamps: string[];
  language: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

export interface FetchTranscriptResponse {
  message: string;
  data: VideoTranscript;
  cached: boolean;
  cache_layer?: string;
}

export interface ListTranscriptsResponse {
  transcripts: VideoTranscript[];
  limit: number;
  offset: number;
}

export interface APIError {
  error: string;
}

// Proxy API response type (combined captions + metadata)
interface ProxyResponse {
  video_id: string;
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  captions: string;
  language: string;
  word_count: number;
  cached: boolean;
  cache_layer: string;
  cache_age?: number;
}

const STORAGE_KEY = 'youtube-transcripts';

export class YouTubeTranscriptAPI {
  /**
   * Get stored transcripts from localStorage
   */
  private getStoredTranscripts(): VideoTranscript[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save transcripts to localStorage
   */
  private saveTranscripts(transcripts: VideoTranscript[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transcripts));
  }

  /**
   * Store a transcript locally
   */
  private storeTranscript(transcript: VideoTranscript): void {
    const transcripts = this.getStoredTranscripts();
    const existingIndex = transcripts.findIndex(t => t.video_id === transcript.video_id);

    if (existingIndex >= 0) {
      transcripts[existingIndex] = transcript;
    } else {
      transcripts.unshift(transcript);
    }

    this.saveTranscripts(transcripts);
  }

  /**
   * Fetch a YouTube transcript using the proxy API
   */
  async fetchTranscript(request: { video: string; force?: boolean }): Promise<FetchTranscriptResponse> {
    const videoId = extractVideoId(request.video);
    if (!videoId) {
      throw new Error('Invalid YouTube URL or video ID');
    }

    // Clear cache if force refetch
    if (request.force) {
      await fetch(`/api/transcript?video=${videoId}`, {
        method: 'DELETE',
      });
    }

    // Fetch from proxy API (handles CORS)
    const res = await fetch(`/api/transcript?video=${videoId}`);

    if (!res.ok) {
      const error = await res.json() as APIError;
      throw new Error(error.error || `Failed to fetch transcript: ${res.status}`);
    }

    const data = await res.json() as ProxyResponse;

    // Generate ID based on existing transcripts
    const stored = this.getStoredTranscripts();
    const existingTranscript = stored.find(t => t.video_id === videoId);
    const id = existingTranscript?.id ?? (stored.length > 0 ? Math.max(...stored.map(t => t.id)) + 1 : 1);

    const now = new Date().toISOString();
    const transcript: VideoTranscript = {
      id,
      video_id: videoId,
      title: data.title,
      author_name: data.author_name,
      author_url: data.author_url,
      thumbnail_url: data.thumbnail_url,
      captions: data.captions,
      timestamps: [], // Edge API doesn't provide timestamps
      language: data.language,
      word_count: data.word_count,
      created_at: existingTranscript?.created_at ?? now,
      updated_at: now,
    };

    // Store locally
    this.storeTranscript(transcript);

    return {
      message: data.cached ? 'Retrieved from cache' : 'Transcript fetched',
      data: transcript,
      cached: data.cached,
      cache_layer: data.cache_layer,
    };
  }

  /**
   * Get a transcript by video ID (from proxy API or local storage)
   */
  async getTranscript(videoId: string): Promise<VideoTranscript> {
    // First check local storage
    const stored = this.getStoredTranscripts();
    const localTranscript = stored.find(t => t.video_id === videoId);

    // Fetch fresh from proxy API
    try {
      const res = await fetch(`/api/transcript?video=${videoId}`);

      if (res.ok) {
        const data = await res.json() as ProxyResponse;

        const now = new Date().toISOString();
        const transcript: VideoTranscript = {
          id: localTranscript?.id ?? stored.length + 1,
          video_id: videoId,
          title: data.title,
          author_name: data.author_name,
          author_url: data.author_url,
          thumbnail_url: data.thumbnail_url,
          captions: data.captions,
          timestamps: [],
          language: data.language,
          word_count: data.word_count,
          created_at: localTranscript?.created_at ?? now,
          updated_at: now,
        };

        this.storeTranscript(transcript);
        return transcript;
      }
    } catch {
      // Fall through to local storage
    }

    // Return from local storage if available
    if (localTranscript) {
      return localTranscript;
    }

    throw new Error('Transcript not found');
  }

  /**
   * List all stored transcripts from localStorage
   */
  async listTranscripts(limit = 50, offset = 0): Promise<ListTranscriptsResponse> {
    const transcripts = this.getStoredTranscripts();
    const paginated = transcripts.slice(offset, offset + limit);

    return {
      transcripts: paginated,
      limit,
      offset,
    };
  }

  /**
   * Delete a transcript (from localStorage and clear Edge API cache)
   */
  async deleteTranscript(videoId: string): Promise<{ message: string }> {
    // Remove from localStorage
    const transcripts = this.getStoredTranscripts();
    const filtered = transcripts.filter(t => t.video_id !== videoId);
    this.saveTranscripts(filtered);

    // Clear Edge API cache via proxy
    try {
      await fetch(`/api/transcript?video=${videoId}`, {
        method: 'DELETE',
      });
    } catch {
      // Ignore cache clear errors
    }

    return { message: 'Transcript deleted' };
  }

  /**
   * Clear all locally stored transcripts
   */
  clearAllTranscripts(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Export a singleton instance
export const api = new YouTubeTranscriptAPI();

/**
 * Extract video ID from various YouTube URL formats
 */
export function extractVideoId(urlOrId: string): string | null {
  // If it's already an ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }

  // Extract from URL
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = urlOrId.match(pattern);
    if (match) return match[1];
  }

  return null;
}
