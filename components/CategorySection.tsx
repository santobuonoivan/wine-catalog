import React from "react";
import WineCard from "./WineCard";

interface CategorySectionProps {
  category: any; // Simplified to any for compatibility
  wines: any[]; // Simplified to any for compatibility
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  wines,
}) => {
  if (!wines || wines.length === 0) return null;

  const categoryTitle =
    category.title?.translations?.en || category.title || "Categoría de Vinos";

  return (
    <section className="category-section mb-20">
      <div className="category-header text-center mb-12 pb-6 border-b-4 border-red-800">
        <h2 className="category-title text-4xl font-bold text-red-800 uppercase tracking-wide mb-4">
          {categoryTitle}
        </h2>
        <div className="category-underline w-24 h-2 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      <div className="wines-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wines.map((wine, index) => (
          <WineCard key={wine.id || index} wine={wine} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
