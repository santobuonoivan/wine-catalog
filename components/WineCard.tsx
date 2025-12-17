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
    <div className="wine-card bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="wine-image-container relative bg-white p-6 flex justify-center items-center" style={{ height: '280px' }}>
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain "
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
            background: '#1a1a1a',
            color: 'white',
            padding: '5px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {vintage}
          </div>
        )}
      </div>

      {/* Info Section - Flex grow to push pricing to bottom */}
      <div className="wine-info p-5 bg-white flex flex-col flex-grow">
        {/* Title and Origin - Fixed Height */}
        <div className="wine-header mb-3 pb-3 border-b border-gray-200" style={{ minHeight: '85px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: '700', 
            color: '#1a1a1a',
            marginBottom: '10px',
            lineHeight: '1.3',
            height: '44px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {title}
          </h3>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#f8f9fa',
            color: '#495057',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            border: '1px solid #dee2e6'
          }}>
            🌍 {countries[0]}
          </span>
        </div>

        {/* Description - Fixed Height */}
        <div className="wine-description mb-4 flex-grow" style={{ minHeight: '100px', maxHeight: '100px' }}>
          <p style={{
            color: '#6c757d',
            fontSize: '12.5px',
            lineHeight: '1.5',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical'
          }}>
            {description}
          </p>
        </div>

        {/* Pricing Section - Fixed at bottom */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
            borderRadius: '6px',
            padding: '14px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.15)', paddingRight: '6px' }}>
                <p style={{ 
                  fontSize: '9px', 
                  textTransform: 'uppercase', 
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}>
                  {t('unitPrice')}
                </p>
                <p style={{ 
                  fontSize: '20px', 
                  fontWeight: '700',
                  color: 'white',
                  letterSpacing: '-0.5px'
                }}>
                  ${price.toFixed(2)}
                </p>
              </div>
              <div style={{ textAlign: 'center', paddingLeft: '6px' }}>
                <p style={{ 
                  fontSize: '9px', 
                  textTransform: 'uppercase', 
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}>
                  {t('casePrice')}
                </p>
                <p style={{ 
                  fontSize: '20px', 
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
              background: '#f8f9fa',
              borderRadius: '5px',
              padding: '9px 11px',
              border: '1px solid #dee2e6'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: '#6c757d', fontWeight: '500' }}>📦 {t('available')}</span>
                  <span style={{ fontWeight: '700', color: '#212529' }}>
                    {cases} {cases === 1 ? t('case') : t('cases')}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: '#6c757d' }}>🍾</span>
                  <span style={{ fontWeight: '700', color: '#212529' }}>
                    {bottles} {bottles === 1 ? t('bottle') : t('bottles')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WineCard;
