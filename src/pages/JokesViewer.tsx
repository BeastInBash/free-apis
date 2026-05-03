import { useEffect, useState } from "react"

interface Joke {
    id: number
    content: string
    categories: string[]
}


export const JokesViewer = () => {
    const [joke, setJoke] = useState<Joke | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchJokes = async () => {
        setLoading(true)
        try {
            const res = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes`)
            const json = await res.json()

            const jokesArray = json.data.data

            const randomIndex = Math.floor(Math.random() * jokesArray.length)
            const randomJoke = jokesArray[randomIndex]
    console.log("Json", json)
            setJoke(randomJoke)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJokes()
    }, [])

    if (loading)
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            </div>
        )

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            {joke && (
                <div className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-center">

                    {/* ID */}
                    <span className="text-xs font-mono text-neutral-600">
                        #{joke.id}
                    </span>

                    {/* Content */}
                    <p className="text-neutral-300 text-lg leading-relaxed">
                        {joke.content}
                    </p>

                    {/* Categories */}
                    <div className="flex justify-center gap-2">
                        {joke.categories.length === 0 ? (
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                clean
                            </span>
                        ) : (
                            joke.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
                                >
                                    {cat}
                                </span>
                            ))
                        )}
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={fetchJokes}
                        className="mt-4 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm text-white"
                    >
                        New Joke 😂
                    </button>
                </div>
            )}
        </div>
    )
}
