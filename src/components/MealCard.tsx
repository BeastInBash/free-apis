import type { Meal } from "../pages/MealsListing";

const categoryColors: Record<string, string> = {
    Vegetarian: "bg-emerald-100 text-emerald-800",
    Dessert: "bg-rose-100 text-rose-800",
    Chicken: "bg-amber-100 text-amber-800",
    Seafood: "bg-sky-100 text-sky-800",
    Pork: "bg-orange-100 text-orange-800",
    Miscellaneous: "bg-purple-100 text-purple-800",
};

const areaFlag: Record<string, string> = {
    Indian: "🇮🇳", British: "🇬🇧", French: "🇫🇷", American: "🇺🇸",
    Canadian: "🇨🇦", Malaysian: "🇲🇾", Japanese: "🇯🇵", Chinese: "🇨🇳",
};
export function MealCard({ meal, index, onClick }: { meal: Meal; index: number; onClick: () => void }) {
    const badgeClass = categoryColors[meal?.strCategory] ?? "bg-stone-100 text-stone-700";
    const flag = areaFlag[meal?.strArea] ?? "🌍";
    const tags = meal.strTags ? meal.strTags.split(",").slice(0, 2) : [];

    return (
        <article
            onClick={onClick}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Area flag */}
                <span className="absolute top-3 right-3 text-xl drop-shadow">{flag}</span>
                {/* Category badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeClass}`}>
                    {meal.strCategory}
                </span>
            </div>

            <div className="p-4">
                <h2
                    className="text-base font-bold text-stone-900 leading-snug mb-1 group-hover:text-amber-700 transition-colors line-clamp-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {meal.strMeal}
                </h2>
                <p className="text-xs text-stone-400 font-sans mb-3">{meal.strArea} Cuisine</p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-sans bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-sans text-stone-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                        </svg>
                        View Recipe
                    </span>
                    <span className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-500 transition-colors flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-stone-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </article>
    );
}
