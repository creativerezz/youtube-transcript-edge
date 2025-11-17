"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { api, type VideoTranscript } from "@/lib/api"
import { ChevronLeft, ChevronRight, Loader2, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function TranscriptList() {
  const [transcripts, setTranscripts] = useState<VideoTranscript[]>([])
  const [loading, setLoading] = useState(true)
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [deleting, setDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const loadTranscripts = async () => {
    setLoading(true)
    try {
      const response = await api.listTranscripts(limit, offset)
      setTranscripts(response.transcripts)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load transcripts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTranscripts()
  }, [offset])

  const handleDelete = async (videoId: string) => {
    if (!confirm("Are you sure you want to delete this transcript?")) {
      return
    }

    setDeleting(videoId)
    try {
      await api.deleteTranscript(videoId)
      toast({
        title: "Deleted",
        description: "Transcript deleted successfully",
      })
      loadTranscripts()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete transcript",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit)
    }
  }

  const handleNext = () => {
    if (transcripts.length === limit) {
      setOffset(offset + limit)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stored Transcripts</CardTitle>
        <CardDescription>
          Browse and manage your cached YouTube transcripts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : transcripts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No transcripts found</p>
            <p className="text-sm mt-1">Fetch a YouTube transcript to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {transcripts.map((transcript) => (
                <div
                  key={transcript.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <img
                    src={transcript.thumbnail_url}
                    alt={transcript.title}
                    className="w-24 h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                      {transcript.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {transcript.author_name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(transcript.updated_at).toLocaleDateString()} • ID: {transcript.video_id}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Link href={`/transcript/${transcript.video_id}`}>
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transcript.video_id)}
                      disabled={deleting === transcript.video_id}
                      title="Delete"
                    >
                      {deleting === transcript.video_id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={offset === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Showing {offset + 1} - {offset + transcripts.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={transcripts.length < limit}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
