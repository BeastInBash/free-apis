import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface IPData {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

interface ImageCarouselProps {
    images: string[]
    title: string
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
    const [current, setCurrent] = useState(0)

    const prev = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
        },
        [images.length]
    )

    const next = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
        },
        [images.length]
    )

    return (
        <div className="relative w-full h-52 bg-stone-100 overflow-hidden group">
            <div
                className="flex h-full transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`${title} ${i + 1}`}
                        className="min-w-full h-full object-contain"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                "https://via.placeholder.com/300x200?text=No+Image"
                        }}
                    />
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white text-stone-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white text-stone-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrent(i)
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === current ? "bg-stone-700 w-3" : "bg-stone-400"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

interface StarRatingProps {
    rating: number
}

const StarRating = ({ rating }: StarRatingProps) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-500" : "text-stone-300"
                        }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-xs text-stone-500 ml-0.5">{rating.toFixed(1)}</span>
        </div>
    )
}

interface ProductCardProps {
    product: IPData
    onClick: () => void
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
    const discountedPrice = product.price * (1 - product.discountPercentage / 100)

    return (
        <div
            onClick={onClick}
            className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all duration-200 cursor-pointer flex flex-col"
        >
            <ImageCarousel images={product.images} title={product.title} />

            <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">{product.brand}</p>
                        <h3 className="text-sm font-semibold text-stone-800 leading-snug mt-0.5">{product.title}</h3>
                    </div>
                    <span className="shrink-0 text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full capitalize">
                        {product.category}
                    </span>
                </div>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{product.description}</p>

                <StarRating rating={product.rating} />

                <div className="mt-auto pt-2 flex items-end justify-between">
                    <div>
                        <p className="text-base font-bold text-stone-800">${discountedPrice.toFixed(2)}</p>
                        <div className="flex items-center gap-1.5">
                            <p className="text-xs text-stone-400 line-through">${product.price}</p>
                            <span className="text-xs text-emerald-600 font-medium">
                                -{product.discountPercentage}%
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-xs font-medium ${product.stock < 50 ? "text-amber-600" : "text-stone-500"}`}>
                            {product.stock < 50 ? `Only ${product.stock} left` : `${product.stock} in stock`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SkeletonCard = () => (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden animate-pulse">
        <div className="h-52 bg-stone-100" />
        <div className="p-4 space-y-3">
            <div className="h-3 bg-stone-100 rounded w-1/3" />
            <div className="h-4 bg-stone-100 rounded w-2/3" />
            <div className="h-3 bg-stone-100 rounded w-full" />
            <div className="h-3 bg-stone-100 rounded w-5/6" />
            <div className="h-5 bg-stone-100 rounded w-1/4 mt-4" />
        </div>
    </div>
)

export const ProductListing = () => {
    const navigate = useNavigate()
    const [product, setProducts] = useState<IPData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch("https://api.freeapi.app/api/v1/public/randomproducts")
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()
                setProducts(json.data?.data ?? [])
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load products")
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [])

    const categories = Array.from(new Set(product.map((p) => p.category)))

    const filtered = product.filter((s) => {
        const matchedSearch = s.brand.toLowerCase().includes(search.toLowerCase()) ||
            s.title.toLowerCase().includes(search.toLowerCase())
        const matchCat = activeCategory ? s.category === activeCategory : true
        return matchedSearch && matchCat
    })

    return (
        <div className="min-h-screen bg-stone-50">
            <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-stone-800 tracking-tight">Products</h1>
                            {!loading && (
                                <p className="text-xs text-stone-400 mt-0.5">
                                    {filtered.length} of {product.length} items
                                </p>
                            )}
                        </div>

                        <div className="relative w-full sm:w-72">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by brand or title…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {categories.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full border transition-all duration-150 ${activeCategory === null
                                        ? "bg-stone-800 text-white border-stone-800"
                                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                                    }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                                    className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full border capitalize transition-all duration-150 ${activeCategory === cat
                                            ? "bg-stone-800 text-white border-stone-800"
                                            : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {error && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-stone-600 font-medium">No products found</p>
                        <p className="text-stone-400 text-sm mt-1">Try adjusting your search or filters</p>
                        <button
                            onClick={() => { setSearch(""); setActiveCategory(null) }}
                            className="mt-4 px-4 py-2 text-sm bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onClick={() => console.log("clicked")}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
