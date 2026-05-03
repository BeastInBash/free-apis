import { useEffect, useState, useCallback } from "react"

interface CatWeight {
  imperial: string
  metric: string
}

interface CatData {
  id: number
  name: string
  temperament: string
  origin: string
  country_code: string
  description: string
  life_span: string
  alt_names: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  hypoallergenic: number
  indoor: number
  rare: number
  wikipedia_url: string
  image: string
  weight: CatWeight
}

interface StatBarProps {
  label: string
  value: number
  max?: number
}

const StatBar = ({ label, value, max = 5 }: StatBarProps) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-stone-500 w-28 shrink-0 truncate">{label}</span>
    <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-stone-700 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="text-xs font-medium text-stone-600 w-5 text-right">{value}</span>
  </div>
)

interface TagProps {
  children: React.ReactNode
}

const Tag = ({ children }: TagProps) => (
  <span className="px-2.5 py-1 text-xs bg-stone-100 text-stone-600 rounded-full border border-stone-200">
    {children}
  </span>
)

const Skeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="w-full h-80 bg-stone-100 rounded-2xl" />
    <div className="space-y-3">
      <div className="h-7 bg-stone-100 rounded w-1/3" />
      <div className="h-4 bg-stone-100 rounded w-1/4" />
      <div className="h-4 bg-stone-100 rounded w-full" />
      <div className="h-4 bg-stone-100 rounded w-5/6" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 bg-stone-100 rounded" />
      ))}
    </div>
  </div>
)

export const RandomCats = () => {
  const [cat, setCat] = useState<CatData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const fetchCat = useCallback(async () => {
    setLoading(true)
    setError(null)
    setImgLoaded(false)
    setCat(null)
    try {
      const res = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random")
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const json = await res.json()
      setCat(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cat")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCat()
  }, [fetchCat])

  const temperaments = cat?.temperament?.split(", ") ?? []

  return (
    <div className="min-h-screen bg-stone-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Random Cat</h1>
            <p className="text-sm text-stone-400 mt-0.5">Discover a new breed every time</p>
          </div>
          <button
            onClick={fetchCat}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-xl hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {loading ? "Loading…" : "New Cat"}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {loading && <Skeleton />}

        {!loading && cat && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="relative w-full h-80 bg-stone-100">
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse bg-stone-100" />
              )}
              <img
                src={cat.image}
                alt={cat.name}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-contain transition-opacity  duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              />
              {cat.rare === 1 && (
                <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 rounded-full">
                  Rare
                </span>
              )}
              {cat.hypoallergenic === 1 && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full">
                  Hypoallergenic
                </span>
              )}
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-stone-800">{cat.name}</h2>
                    {cat.alt_names && (
                      <p className="text-xs text-stone-400 mt-0.5">also known as {cat.alt_names}</p>
                    )}
                  </div>
                  <a
                    href={cat.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-lg transition"
                    title="Wikipedia"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Tag>🌍 {cat.origin}</Tag>
                  <Tag>⏳ {cat.life_span} yrs</Tag>
                  <Tag>⚖️ {cat.weight.metric} kg</Tag>
                  {cat.indoor === 1 && <Tag>🏠 Indoor</Tag>}
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">{cat.description}</p>

              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Temperament</p>
                <div className="flex flex-wrap gap-1.5">
                  {temperaments.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs bg-stone-800 text-stone-100 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Traits</p>
                <div className="space-y-2.5">
                  <StatBar label="Adaptability" value={cat.adaptability} />
                  <StatBar label="Affection" value={cat.affection_level} />
                  <StatBar label="Child Friendly" value={cat.child_friendly} />
                  <StatBar label="Dog Friendly" value={cat.dog_friendly} />
                  <StatBar label="Energy Level" value={cat.energy_level} />
                  <StatBar label="Intelligence" value={cat.intelligence} />
                  <StatBar label="Social Needs" value={cat.social_needs} />
                  <StatBar label="Stranger Friendly" value={cat.stranger_friendly} />
                  <StatBar label="Grooming" value={cat.grooming} />
                  <StatBar label="Shedding" value={cat.shedding_level} />
                  <StatBar label="Vocalisation" value={cat.vocalisation} />
                  <StatBar label="Health Issues" value={cat.health_issues} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
