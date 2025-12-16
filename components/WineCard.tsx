import { useLanguage } from "@/app/langContext";
import React from "react";

interface WineCardProps {
  wine: any; // Simplified to any for compatibility
}

const WineCard: React.FC<WineCardProps> = ({ wine }) => {
  const { lang } = useLanguage();

  const getDescription = (it: any, l: "es" | "en") => {
    const d = it?.description ?? {};
    if (typeof d === "string") return d;
    const translations = (d.translations && d.translations) || d;
    return translations?.[l] || translations?.es || translations?.en || "";
  };

  // Translations
  const translations = {
    unitPrice: {
      es: "Precio Unitario",
      en: "Unit Price"
    },
    casePrice: {
      es: "Precio por Caja",
      en: "Case Price"
    },
    available: {
      es: "Disponible:",
      en: "Available:"
    },
    case: {
      es: "caja",
      en: "case"
    },
    cases: {
      es: "cajas",
      en: "cases"
    },
    bottle: {
      es: "botella",
      en: "bottle"
    },
    bottles: {
      es: "botellas",
      en: "bottles"
    }
  };

  const t = (key: keyof typeof translations) => translations[key][lang];

  const description = getDescription(wine, lang);
  const getVintage = (id: string) => {
    const matches = id.match(/(\d{4})/);
    return matches ? matches[1] : "";
  };

  const vintage = getVintage(wine.id);
  const title = wine.title?.translations?.en || wine.title || "Vino Sin Nombre";
  const price = wine.price_info?.price || 0;
  const casesPrice = wine.price_info?.cases_price || 0;
  const cases = wine.quantity_info?.quantity?.cases || 0;
  const bottles = wine.quantity_info?.quantity?.bottles || 0;

  const countries = wine.product_info?.countries_of_origin || [
    "No especificado",
  ];
  const imageUrl = wine.image_url;

  return (
    <div className="wine-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="wine-image-container relative bg-gradient-to-br from-slate-50 to-gray-100 p-6 flex justify-center items-center h-72">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain drop-shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svgxml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300' fill='none'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M50 100 L150 100 L150 200 L100 250 L50 200 Z' fill='%23d1d5db'/%3E%3Ctext x='100' y='280' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='12'%3EWine%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Vintage Badge */}
        {vintage && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#1f2937',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {vintage}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="wine-info p-5 bg-white">
        {/* Title and Origin */}
        <div className="wine-header mb-4 pb-3 border-b border-gray-200">
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            color: '#111827',
            marginBottom: '8px',
            lineHeight: '1.4'
          }}>
            {title}
          </h3>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#f9fafb',
            color: '#374151',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: '500',
            border: '1px solid #e5e7eb'
          }}>
            🌍 {countries[0]}
          </span>
        </div>

        {/* Description */}
        <div className="wine-description mb-4">
          <p style={{
            color: '#6b7280',
            fontSize: '13px',
            lineHeight: '1.6'
          }}>
            {description}
          </p>
        </div>

        {/* Pricing Section - Professional Style */}
        <div style={{ 
          background: '#7f1d1d',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '12px',
          boxShadow: '0 2px 8px rgba(127, 29, 29, 0.15)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <p style={{ 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '6px',
                fontWeight: '600',
                letterSpacing: '1px'
              }}>
                {t('unitPrice')}
              </p>
              <p style={{ 
                fontSize: '22px', 
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.5px'
              }}>
                ${price.toFixed(2)}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '6px',
                fontWeight: '600',
                letterSpacing: '1px'
              }}>
                {t('casePrice')}
              </p>
              <p style={{ 
                fontSize: '22px', 
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.5px'
              }}>
                ${casesPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Stock Information */}
        {(cases > 0 || bottles > 0) && (
          <div style={{
            background: '#f9fafb',
            borderRadius: '6px',
            padding: '10px 12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '13px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#6b7280', fontWeight: '500' }}>📦 {t('available')}</span>
                <span style={{ fontWeight: '700', color: '#111827' }}>
                  {cases} {cases === 1 ? t('case') : t('cases')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#6b7280' }}>🍾</span>
                <span style={{ fontWeight: '700', color: '#111827' }}>
                  {bottles} {bottles === 1 ? t('bottle') : t('bottles')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WineCard;
