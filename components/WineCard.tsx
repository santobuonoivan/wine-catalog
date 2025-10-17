import React from "react";

interface WineCardProps {
  wine: any; // Simplified to any for compatibility
}

const WineCard: React.FC<WineCardProps> = ({ wine }) => {
  // Extraer año del ID del vino
  const getVintage = (id: string) => {
    const matches = id.match(/(\d{4})/);
    return matches ? matches[1] : "";
  };

  const vintage = getVintage(wine.id);
  const title = wine.title?.translations?.en || wine.title || "Vino Sin Nombre";
  const description =
    wine.description?.translations?.en ||
    wine.description ||
    "Sin descripción disponible";
  const countries = wine.product_info?.countries_of_origin || [
    "No especificado",
  ];
  const imageUrl = wine.image_url;

  return (
    <div className="wine-card bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="wine-image-container bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex justify-center items-center h-64">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain drop-shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300' fill='none'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M50 100 L150 100 L150 200 L100 250 L50 200 Z' fill='%23d1d5db'/%3E%3Ctext x='100' y='280' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='12'%3EWine%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="wine-info p-6">
        <div className="wine-header mb-4">
          <h3 className="wine-name text-xl font-bold text-gray-800 mb-2 leading-tight">
            {title}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {vintage && (
              <span className="wine-vintage inline-block bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {vintage}
              </span>
            )}
            <span className="inline-block bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
              {countries[0]}
            </span>
          </div>
        </div>

        <div className="wine-description">
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
