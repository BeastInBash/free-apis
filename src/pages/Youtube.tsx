import { useEffect, useState } from "react"

type Thumbnail = {
  url: string
  width: number
  height: number
}

type VideoItem = {
  kind: string
  id: string
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
      standard: Thumbnail
      maxres: Thumbnail
    }
    channelTitle: string
    tags: string[]
  }
  contentDetails: {
    duration: string
  }
  statistics: {
    viewCount: string
    likeCount: string
    commentCount: string
  }
}

type VideoEntry = {
  kind: string
  items: VideoItem
}

type ApiResponse = {
  data: {
    data: VideoEntry[]
    page: number
    totalPages: number
    totalItems: number
  }
  success: boolean
  message: string
}

function parseDuration(iso: string): string {
  const m = iso.match(/(?:(d+)H)?(?:(d+)M)?(?:(d+)S)?/)
  if (!m) return ""
  const h = parseInt(m[1] ?? "0")
  const min = parseInt(m[2] ?? "0")
  const sec = parseInt(m[3] ?? "0")
  if (h) return `${h}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  return `${min}:${String(sec).padStart(2, "0")}`
}

function fmtCount(n: string): string {
  const num = parseInt(n)
  return num >= 1000 ? (num / 1000).toFixed(1) + "K" : String(num)
}

export const Youtube = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
      if (!res.ok) throw new Error("Failed to fetch")
      const json: ApiResponse = await res.json()
      const items = json.data.data.map((entry) => entry.items)
      setVideos(items)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-colors"
          >
            <div className="relative aspect-video">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                {parseDuration(video.contentDetails.duration)}
              </span>
            </div>

            <div className="p-3 space-y-2">
              <p className="text-neutral-100 text-sm font-medium leading-snug line-clamp-2">
                {video.snippet.title}
              </p>

              <p className="text-neutral-500 text-xs">
                {video.snippet.channelTitle} · {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3 text-xs text-neutral-400">
                <span>{fmtCount(video.statistics.viewCount)} views</span>
                <span>{fmtCount(video.statistics.likeCount)} likes</span>
                <span>{fmtCount(video.statistics.commentCount)} comments</span>
              </div>

              {video.snippet.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {video.snippet.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
