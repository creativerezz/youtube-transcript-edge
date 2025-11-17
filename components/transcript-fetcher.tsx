"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { api, extractVideoId, type VideoTranscript } from "@/lib/api"
import { Download, Loader2, Youtube } from "lucide-react"

interface TranscriptFetcherProps {
  onTranscriptFetched?: (transcript: VideoTranscript) => void
}

export function TranscriptFetcher({ onTranscriptFetched }: TranscriptFetcherProps) {
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [transcript, setTranscript] = useState<VideoTranscript | null>(null)
  const { toast } = useToast()

  const handleFetch = async (force = false) => {
    if (!videoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL or video ID",
        variant: "destructive",
      })
      return
    }

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL or video ID",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await api.fetchTranscript({
        video: videoUrl,
        languages: ["en"],
        force,
      })

      setTranscript(response.data)
      onTranscriptFetched?.(response.data)

      toast({
        title: response.cached ? "Transcript Retrieved" : "Transcript Fetched",
        description: response.cached 
          ? "Retrieved from cache" 
          : "Successfully fetched and stored",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch transcript",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadTranscript = () => {
    if (!transcript) return

    const content = `Title: ${transcript.title}
Author: ${transcript.author_name}
Video ID: ${transcript.video_id}
Created: ${new Date(transcript.created_at).toLocaleString()}

=== CAPTIONS ===
${transcript.captions}

=== TIMESTAMPS ===
${transcript.timestamps.join('\n')}
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${transcript.video_id}-transcript.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded",
      description: "Transcript downloaded successfully",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-6 w-6 text-red-600" />
          Fetch YouTube Transcript
        </CardTitle>
        <CardDescription>
          Enter a YouTube URL or video ID to fetch and store the transcript
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video-url">YouTube URL or Video ID</Label>
          <div className="flex gap-2">
            <Input
              id="video-url"
              placeholder="https://youtu.be/dQw4w9WgXcQ or dQw4w9WgXcQ"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleFetch(false)
                }
              }}
            />
            <Button 
              onClick={() => handleFetch(false)} 
              disabled={loading}
              className="whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                "Fetch"
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            If the transcript is already cached, it will be retrieved instantly
          </p>
        </div>

        {transcript && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start gap-4">
              <img
                src={transcript.thumbnail_url}
                alt={transcript.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                  {transcript.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {transcript.author_name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Video ID: {transcript.video_id}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleFetch(true)}
                disabled={loading}
              >
                Force Refetch
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={downloadTranscript}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Preview (First 500 characters)</Label>
              <div className="bg-muted p-3 rounded text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                {transcript.captions.substring(0, 500)}
                {transcript.captions.length > 500 && "..."}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
