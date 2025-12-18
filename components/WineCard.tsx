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

  const description = getDescription(wine, lang);
  const getVintage = (id: string) => {
    const matches = id.match(/(\d{4})/g);
    return matches ? matches[matches.length - 1] : "";
  };

  const vintage = getVintage(wine.id);
  const title = wine.title?.translations?.en || wine.title || "Vino Sin Nombre";
  const price = wine.price_info?.price || 0;
  const casesPrice = wine.price_info?.cases_price || 0;

  // Determinar el tipo de vino basado en el título o descripción
  const getWineType = () => {
    const text = (title + " " + description).toLowerCase();
    if (
      text.includes("red") ||
      text.includes("tinto") ||
      text.includes("cabernet") ||
      text.includes("malbec") ||
      text.includes("pinot noir")
    )
      return "Red";
    if (
      text.includes("white") ||
      text.includes("blanco") ||
      text.includes("chardonnay") ||
      text.includes("sauvignon blanc")
    )
      return "White";
    if (text.includes("rosé") || text.includes("rosado")) return "Rosé";
    if (
      text.includes("sparkling") ||
      text.includes("espumoso") ||
      text.includes("champagne")
    )
      return "Sparkling";
    return "Wine";
  };

  const wineType = getWineType();
  const imageUrl = wine.image_url;

  return (
    <div
      style={{
        background: "#f8f9fa",
        borderRadius: "0",
        overflow: "hidden",
        border: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image Section */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #fef9f3 0%, #f8f4ed 100%)",
          padding: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "320px",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            mixBlendMode:
              "multiply" /* Esto hace que el blanco se vuelva transparente */,
            filter:
              "contrast(1.2)" /* Opcional: para que los bordes se vean más limpios */,
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svgxml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300' fill='none'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M50 100 L150 100 L150 200 L100 250 L50 200 Z' fill='%23d1d5db'/%3E%3Ctext x='100' y='280' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='12'%3EWine%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Info Section */}
      <div
        style={{
          padding: "24px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "12px",
            lineHeight: "1.4",
            minHeight: "50px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </h3>

        {/* Badges */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {vintage && (
            <span
              style={{
                background: "#8b4545",
                color: "white",
                padding: "4px 12px",
                borderRadius: "3px",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              {vintage}
            </span>
          )}
          <span
            style={{
              background: "#d4a574",
              color: "white",
              padding: "4px 12px",
              borderRadius: "3px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            {wineType}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            color: "#666",
            fontSize: "13px",
            lineHeight: "1.6",
            marginBottom: "20px",
            flexGrow: 1,
          }}
        >
          {description}
        </p>

        {/* Price Section */}
        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            paddingTop: "16px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                  fontWeight: "500",
                }}
              >
                Unit Price
              </p>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#2c3e50",
                }}
              >
                ${price.toFixed(2)}
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                  fontWeight: "500",
                }}
              >
                Case Price
              </p>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#2c3e50",
                }}
              >
                ${casesPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
