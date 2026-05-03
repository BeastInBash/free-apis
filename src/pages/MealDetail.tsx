import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import type { Meal } from "./MealsListing";
import { parseSteps } from "../helpers/helper";
import { getIngredients } from "../helpers/helper";

const areaFlag: Record<string, string> = {
    Indian: "🇮🇳", British: "🇬🇧", French: "🇫🇷", American: "🇺🇸",
    Canadian: "🇨🇦", Malaysian: "🇲🇾", Japanese: "🇯🇵", Chinese: "🇨🇳",
};

export default function MealDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const meal: Meal | undefined = location.state?.meal;

    if (!meal) {
        return (
            <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center gap-4 font-sans text-stone-500">
                <p className="text-5xl">🍽️</p>
                <p>Recipe not found.</p>
                <button onClick={() => navigate(-1)} className="text-amber-600 underline text-sm">Go back</button>
            </div>
        );
    }

    const ingredients = getIngredients(meal);
    const steps = parseSteps(meal.strInstructions ?? "");
    const tags = meal.strTags ? meal.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const flag = areaFlag[meal.strArea] ?? "🌍";
    const youtubeId = meal.strYoutube?.split("v=")[1];

    const toggleIngredient = (i: number) =>
        setCheckedIngredients((prev) => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });

    const toggleStep = (i: number) =>
        setCompletedSteps((prev) => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });

    const progress = steps.length > 0 ? Math.round((completedSteps.size / steps.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-[#faf8f3] font-serif">
            <div className="relative h-72 sm:h-96 overflow-hidden">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-sans px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-2xl">{flag}</span>
                            <span className="text-xs font-sans font-semibold text-white/70 uppercase tracking-widest">{meal.strArea} Cuisine</span>
                            <span className="text-white/40">·</span>
                            <span className="text-xs font-sans font-semibold text-amber-300 uppercase tracking-widest">{meal.strCategory}</span>
                        </div>
                        <h1
                            className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            {meal.strMeal}
                        </h1>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {tags.map((tag) => (
                                    <span key={tag} className="text-[11px] font-sans bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2 py-0.5 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
                            <h2 className="text-lg font-bold text-stone-900 mb-1" style={{ fontFamily: "'Georgia', serif" }}>Ingredients</h2>
                            <p className="text-xs font-sans text-stone-400 mb-4">Tap to check off</p>
                            <ul className="space-y-2">
                                {ingredients.map((ing, i) => (
                                    <li
                                        key={i}
                                        onClick={() => toggleIngredient(i)}
                                        className={`flex items-start gap-3 cursor-pointer group transition-opacity ${checkedIngredients.has(i) ? "opacity-40" : ""}`}
                                    >
                                        <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${checkedIngredients.has(i) ? "bg-amber-500 border-amber-500" : "border-stone-300 group-hover:border-amber-400"
                                            }`}>
                                            {checkedIngredients.has(i) && (
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <span className={`text-sm font-sans text-stone-800 ${checkedIngredients.has(i) ? "line-through" : ""}`}>{ing.name}</span>
                                            {ing.measure && (
                                                <span className="ml-1 text-xs text-stone-400">— {ing.measure}</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-2">
                                {meal.strYoutube && (
                                    <a
                                        href={meal.strYoutube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-sans text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.5 6.2s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-.1C16.8 3 12 3 12 3s-4.8 0-7.3.3c-.6.1-1.9.1-3 1.2C.8 5.3.5 7.2.5 7.2S.2 9.4.2 11.6v2.1c0 2.2.3 4.4.3 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 22.2 12 22.2 12 22.2s4.8 0 7.3-.3c.6-.1 1.9-.1 3-1.2.9-.9 1.2-2.8 1.2-2.8s.3-2.2.3-4.4v-2c0-2.2-.3-4.3-.3-4.3zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
                                        </svg>
                                        Watch on YouTube
                                    </a>
                                )}
                                {meal.strSource && (
                                    <a
                                        href={meal.strSource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-sans text-stone-500 hover:text-stone-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Original Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </aside>

                    <section className="lg:col-span-2">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>Instructions</h2>
                                <span className="text-xs font-sans text-stone-400">{completedSteps.size}/{steps.length} steps done</span>
                            </div>
                            <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <ol className="space-y-4">
                            {steps.map((step, i) => (
                                <li
                                    key={i}
                                    onClick={() => toggleStep(i)}
                                    className={`flex gap-4 cursor-pointer group p-4 rounded-xl transition-colors ${completedSteps.has(i) ? "bg-amber-50 border border-amber-100" : "bg-white border border-stone-100 hover:border-stone-200"
                                        }`}
                                >
                                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-sans transition-colors ${completedSteps.has(i) ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
                                        }`}>
                                        {completedSteps.has(i) ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : i + 1}
                                    </span>
                                    <p className={`text-sm font-sans leading-relaxed text-stone-700 pt-1 ${completedSteps.has(i) ? "line-through text-stone-400" : ""}`}>
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        {youtubeId && (
                            <div className="mt-10">
                                <h3 className="text-base font-bold text-stone-900 mb-3" style={{ fontFamily: "'Georgia', serif" }}>Video Tutorial</h3>
                                <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                        title={meal.strMeal}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
