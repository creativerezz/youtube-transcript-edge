"use client"

import { useState } from "react"
import { TranscriptFetcher } from "@/components/transcript-fetcher"
import { TranscriptList } from "@/components/transcript-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Youtube } from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("fetch")
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTranscriptFetched = () => {
    // Switch to library tab and refresh the list
    setActiveTab("library")
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Youtube className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            YouTube Transcript Storage
          </h1>
          <p className="text-muted-foreground text-lg">
            Fetch, store, and manage YouTube transcripts with lightning-fast caching
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="fetch">Fetch Transcript</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
          </TabsList>

          <TabsContent value="fetch" className="space-y-4">
            <TranscriptFetcher onTranscriptFetched={handleTranscriptFetched} />
          </TabsContent>

          <TabsContent value="library" className="space-y-4">
            <TranscriptList key={refreshKey} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://youtube-transcript-storage.automatehub.workers.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Cloudflare Workers
            </a>
            {" "}and{" "}
            <a
              href="https://fetch.youtubesummaries.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              YouTube API Server
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
