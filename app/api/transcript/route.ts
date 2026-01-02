import { NextRequest, NextResponse } from 'next/server';

const EDGE_API_URL = process.env.EDGE_API_URL || process.env.NEXT_PUBLIC_EDGE_API_URL || 'https://youtube-ai-platform-edge-worker.automatehub.workers.dev';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get('video');

  if (!videoId) {
    return NextResponse.json({ error: 'Missing video parameter' }, { status: 400 });
  }

  try {
    // Fetch captions and metadata in parallel
    const [captionsRes, metadataRes] = await Promise.all([
      fetch(`${EDGE_API_URL}/youtube/captions?video=${videoId}`),
      fetch(`${EDGE_API_URL}/youtube/metadata?video=${videoId}`),
    ]);

    if (!captionsRes.ok) {
      const error = await captionsRes.json();
      return NextResponse.json(error, { status: captionsRes.status });
    }

    if (!metadataRes.ok) {
      const error = await metadataRes.json();
      return NextResponse.json(error, { status: metadataRes.status });
    }

    const captions = await captionsRes.json();
    const metadata = await metadataRes.json();

    return NextResponse.json({
      video_id: videoId,
      title: metadata.title,
      author_name: metadata.author_name,
      author_url: metadata.author_url,
      thumbnail_url: metadata.thumbnail_url,
      captions: captions.captions,
      language: captions.language,
      word_count: captions.word_count,
      cached: captions.cached,
      cache_layer: captions.cache_layer,
      cache_age: captions.cache_age,
    });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get('video');

  if (!videoId) {
    return NextResponse.json({ error: 'Missing video parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(`${EDGE_API_URL}/youtube/cache/clear?video=${videoId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
