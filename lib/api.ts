// YouTube Transcript Storage API Client

export interface VideoTranscript {
  id: number;
  video_id: string;
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  captions: string;
  timestamps: string[];
  created_at: string;
  updated_at: string;
}

export interface FetchTranscriptRequest {
  video: string;
  languages?: string[];
  force?: boolean;
}

export interface FetchTranscriptResponse {
  message: string;
  data: VideoTranscript;
  cached: boolean;
}

export interface ListTranscriptsResponse {
  transcripts: VideoTranscript[];
  limit: number;
  offset: number;
}

export interface APIError {
  error: string;
}

const API_BASE_URL = 'https://youtube-transcript-storage.automatehub.workers.dev';

export class YouTubeTranscriptAPI {
  private baseURL: string;

  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Fetch and store a YouTube transcript
   */
  async fetchTranscript(request: FetchTranscriptRequest): Promise<FetchTranscriptResponse> {
    const response = await fetch(`${this.baseURL}/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Get a stored transcript by video ID
   */
  async getTranscript(videoId: string): Promise<VideoTranscript> {
    const response = await fetch(`${this.baseURL}/transcript/${videoId}`);

    if (!response.ok) {
      const error: APIError = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * List all stored transcripts with pagination
   */
  async listTranscripts(limit = 50, offset = 0): Promise<ListTranscriptsResponse> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await fetch(`${this.baseURL}/transcripts?${params}`);

    if (!response.ok) {
      const error: APIError = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Delete a stored transcript
   */
  async deleteTranscript(videoId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/transcript/${videoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
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
