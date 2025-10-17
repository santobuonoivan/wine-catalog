import React from "react";

interface CatalogHeaderProps {
  title: string;
  logo: string;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ title, logo }) => {
  return (
    <header className="catalog-header text-center py-12 mb-12 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-lg shadow-lg">
      <div className="header-content max-w-4xl mx-auto px-6">
        <img
          src={logo}
          alt={`${title} Logo`}
          className="logo mx-auto mb-6 max-h-32 filter brightness-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide text-shadow">
          {title.toUpperCase()}
        </h1>

        <p className="subtitle text-xl italic opacity-90 mb-4">
          Catálogo de Vinos Premium
        </p>

        <p className="description text-base max-w-2xl mx-auto opacity-80 leading-relaxed">
          Descubra nuestra selecta colección de vinos chilenos, cada uno
          cuidadosamente elegido para representar la excelencia vitivinícola de
          Chile.
        </p>
      </div>
    </header>
  );
};

export default CatalogHeader;
