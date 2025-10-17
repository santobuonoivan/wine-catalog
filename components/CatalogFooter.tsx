import React from "react";

const CatalogFooter: React.FC = () => {
  return (
    <footer className="catalog-footer text-center py-12 mt-16 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg">
      <div className="footer-content max-w-4xl mx-auto px-6">
        <h3 className="text-xl font-bold mb-4 text-yellow-400">
          Catálogo de Vinos Premium Chilenos
        </h3>

        <p className="mb-4 text-base">
          Este catálogo representa una selección cuidadosa de los mejores
          exponentes de la vitivinicultura chilena contemporánea.
        </p>

        <p className="mb-6 text-sm">
          Cada vino ha sido elegido por su capacidad de expresar la autenticidad
          y diversidad de los terroirs chilenos.
        </p>

        <div className="footer-legal text-xs opacity-80 space-y-1">
          <p>&copy; 2025 - Catálogo Informativo de Vinos</p>
          <p>
            La información técnica y notas de cata son referenciales y pueden
            variar según la añada.
          </p>
          <p className="font-semibold">
            El consumo de alcohol puede causar dependencia. Prohibida su venta a
            menores de 18 años.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CatalogFooter;
