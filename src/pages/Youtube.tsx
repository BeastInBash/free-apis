import { useEffect, useState } from "react"

export const Youtube = () => {
    const [video, setVideos] = useState<Videos | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchVideo = async () => {
        setLoading(true)
        try {
            const res = await fetch(`https://api.freeapi.app/api/v1/public/youtube/videos`)
            const json = await res.json()

            const videoArray = json.data.data

            const randomIndex = Math.floor(Math.random() * videoArray.length)
            const randomeVideos = videoArray[randomIndex]
            console.log("Json", json)
            setVideos(randomeVideos)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVideo()
    }, [])


    if (loading)
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            </div>
        )

    return (<div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        {video && (
            <div className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-center">

                {/* ID */}
                <span className="text-xs font-mono text-neutral-600">
                    #{video.id}
                </span>

                {/* Content */}
                <p className="text-neutral-300 text-lg leading-relaxed">
                    {video.content}
                </p>

                {/* Categories */}
                <div className="flex justify-center gap-2">
                    {video.tags.length === 0 ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                            clean
                        </span>
                    ) : (
                        video.tags.map((cat) => (
                            <span
                                key={cat}
                                className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
                            >
                                {cat}
                            </span>
                        ))
                    )}
                </div>
                <div className="felx justify-center gap-2">
                    <span
                        className="text-xs px-2.5 py-2 rounded-full bg-violet-500/10 text-violet-400 border border-green-500/20"
                    >
                        Author: {video.author}
                    </span>

                </div>

                {/* Refresh Button */}
                <button
                    onClick={fetchVideo}
                    className="mt-4 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm text-white"
                >
                    New video 😂
                </button>
            </div>
        )}
    </div>
    )
}
