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
    <section style={{ marginBottom: '80px' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        paddingBottom: '0'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '400',
          color: '#8b4545',
          letterSpacing: '6px',
          marginBottom: '12px',
          fontFamily: 'Georgia, serif',
          textTransform: 'uppercase'
        }}>
          {categoryTitle}
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '60px',
            height: '1px',
            background: '#c7766a'
          }}></div>
          <p style={{
            fontSize: '14px',
            color: '#888',
            fontStyle: 'italic',
            letterSpacing: '1px',
            margin: 0
          }}>
            Featured Collection
          </p>
          <div style={{
            width: '60px',
            height: '1px',
            background: '#c7766a'
          }}></div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {wines.map((wine, index) => (
          <WineCard key={wine.id || index} wine={wine} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
