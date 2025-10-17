import React from "react";

const LoadingCatalog: React.FC = () => {
  return (
    <div className="loading-catalog flex items-center justify-center min-h-screen bg-gray-50">
      <div className="loading-content text-center">
        <div className="loading-spinner w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Cargando Catálogo de Vinos
        </h2>
        <p className="text-gray-500">
          Por favor espere mientras preparamos la selección...
        </p>
      </div>
    </div>
  );
};

export default LoadingCatalog;
