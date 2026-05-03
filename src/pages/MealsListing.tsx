import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MealCard } from "../components/MealCard";

export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;
    [key: string]: string | null | undefined;
}

const API_URL = "https://api.freeapi.app/api/v1/public/meals";


export default function MealsGrid() {
    const navigate = useNavigate();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const json = await res.json();
                setMeals(json.data?.data ?? []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load recipes");
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, []);

    const categories = Array.from(new Set(meals.map((m) => m.strCategory)));

    const filtered = meals.filter((m) => {
        const matchSearch = m.strMeal.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory ? m.strCategory === activeCategory : true;
        return matchSearch && matchCat;
    });

    return (
        <div className="min-h-screen bg-[#faf8f3] font-serif">
            <header className="sticky top-0 z-30 bg-[#faf8f3]/95 backdrop-blur border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-stone-400 font-sans">The Kitchen</p>
                        <h1 className="text-3xl font-bold text-stone-900 leading-none tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                            Cookbook
                        </h1>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search recipes…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans placeholder:text-stone-400"
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors ${activeCategory === null ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                            className={`shrink-0 px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors ${activeCategory === cat ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-100 animate-pulse">
                                <div className="aspect-[4/3] bg-stone-200" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-stone-200 rounded w-3/4" />
                                    <div className="h-3 bg-stone-100 rounded w-1/2" />
                                    <div className="h-3 bg-stone-100 rounded w-1/3 mt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center py-24 font-sans">
                        <p className="text-5xl mb-4">⚠️</p>
                        <p className="text-stone-600 font-medium mb-1">Failed to load recipes</p>
                        <p className="text-stone-400 text-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-stone-900 text-white text-sm rounded-full hover:bg-stone-700 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <p className="text-xs font-sans text-stone-400 mb-6 uppercase tracking-widest">
                            {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((meal, i) => (
                                <MealCard key={meal.idMeal} meal={meal} index={i} onClick={() => navigate(`/meals/${meal.idMeal}`, { state: { meal } })} />
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="text-center py-24 text-stone-400 font-sans">
                                <p className="text-5xl mb-4">🍽️</p>
                                <p className="text-lg">No recipes found</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

