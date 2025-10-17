import React from "react";

const LoadingCatalog: React.FC = () => {
  return (
    <div className="loading-catalog flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="loading-content text-center p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-md">
        <div className="loading-spinner w-20 h-20 border-4 border-red-700 border-t-transparent rounded-full animate-spin-slow mx-auto mb-6"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Cargando Catálogo de Vinos
        </h2>

        <p className="text-gray-600 text-sm md:text-base">
          Un momento, estamos preparando la selección exclusiva para usted...
        </p>

        <div className="mt-6 w-24 h-1 mx-auto bg-red-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingCatalog;
