"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { api, type VideoTranscript } from "@/lib/api"
import { ArrowLeft, Download, Loader2, ExternalLink, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function TranscriptPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = params.videoId as string
  const [transcript, setTranscript] = useState<VideoTranscript | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadTranscript = async () => {
      setLoading(true)
      try {
        const data = await api.getTranscript(videoId)
        setTranscript(data)
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load transcript",
          variant: "destructive",
        })
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    loadTranscript()
  }, [videoId])

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied",
        description: "Copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!transcript) {
    return null
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${transcript.video_id}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Video Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={transcript.thumbnail_url}
                alt={transcript.title}
                className="w-full md:w-64 h-auto object-cover rounded"
              />
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{transcript.title}</CardTitle>
                <CardDescription className="space-y-1">
                  <p className="text-base">{transcript.author_name}</p>
                  <p className="text-sm">Video ID: {transcript.video_id}</p>
                  <p className="text-sm">
                    Created: {new Date(transcript.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    Updated: {new Date(transcript.updated_at).toLocaleString()}
                  </p>
                </CardDescription>
                <div className="flex gap-2 mt-4">
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      Watch on YouTube
                    </Button>
                  </a>
                  <Button variant="outline" size="sm" onClick={downloadTranscript}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Transcript Content */}
        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>
              Full transcript with captions and timestamps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="captions">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="captions">Captions</TabsTrigger>
                <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
              </TabsList>

              <TabsContent value="captions" className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(transcript.captions)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {transcript.captions}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="timestamps" className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(transcript.timestamps.join('\n'))}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-muted p-6 rounded-lg space-y-2">
                  {transcript.timestamps.map((timestamp, index) => (
                    <div
                      key={index}
                      className="text-sm font-mono leading-relaxed py-1 hover:bg-accent/50 px-2 rounded"
                    >
                      {timestamp}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
