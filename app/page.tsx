"use client";

import React, { useState, useEffect } from "react";
import CatalogHeader from "../components/CatalogHeader";
import CategorySection from "../components/CategorySection";
import CatalogFooter from "../components/CatalogFooter";
import LoadingCatalog from "../components/LoadingCatalog";

// Tipos para el menú
interface MenuItem {
  id: string;
  title: {
    translations: {
      en: string;
    };
  };
  description: {
    translations: {
      en: string;
    };
  };
  image_url: string;
  product_info: {
    countries_of_origin: string[];
    product_traits?: string[];
  };
  price_info?: {
    price: number;
    overrides: any[];
  };
  tax_info?: any;
  dish_info?: any;
  bundled_items?: any;
  external_data?: string;
  quantity_info?: any;
  tax_label_info?: any;
  suspension_info?: any;
  nutritional_info?: any;
  modifier_group_ids?: any;
}

interface Category {
  id: string;
  title: {
    translations: {
      en: string;
    };
  };
  entities: Array<{
    id: string;
    type: string;
  }>;
}

interface MenuData {
  menu_id: number;
  title: string;
  logo: string;
  data: {
    items: MenuItem[];
    categories: Category[];
  };
}

interface MenuResponse {
  status: number;
  data: {
    data: MenuData;
  };
}

export default function WineCatalog() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [categoriesWithWines, setCategoriesWithWines] = useState<
    Array<{
      category: any;
      wines: any[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        // Importar el JSON directamente
        const menuRes = await import("./data/menu-v2.json");

        // El JSON ya tiene la estructura correcta
        const fullData = menuRes.default || menuRes;

        console.log("Full data loaded:", fullData);

        if (fullData.status === 200 && fullData.data?.data) {
          const menuData = fullData.data.data;

          console.log("Menu data loaded:", menuData);
          console.log("Items count:", menuData.data.items.length);
          console.log("Categories count:", menuData.data.categories.length);

          // Procesar categorías reales del JSON
          const itemsAndCategories = menuData.data.categories
            .filter(
              (category: any) =>
                category.entities && category.entities.length > 0
            )
            .map((category: any) => ({
              category,
              wines: category.entities
                .map((entity: any) => {
                  const wine = menuData.data.items.find(
                    (item: any) => item.id === entity.id
                  );
                  return wine;
                })
                .filter((wine: any) => wine !== undefined),
            }))
            .filter((categoryData: any) => categoryData.wines.length > 0);

          console.log("Processed categories:", itemsAndCategories);

          setMenu(menuData);
          setCategoriesWithWines(itemsAndCategories);
        }
      } catch (error) {
        console.error("Error loading menu:", error);

        // Fallback: crear categoría simple con todos los vinos
        try {
          const menuRes = await import("./data/menu-v2.json");
          const fullData = menuRes.default || menuRes;

          if (fullData.data?.data?.data?.items) {
            const allWinesCategory = {
              id: "all_wines",
              title: {
                translations: {
                  en: "Todos los Vinos",
                },
              },
            };

            const itemsAndCategories = [
              {
                category: allWinesCategory,
                wines: fullData.data.data.data.items.slice(0, 16),
              },
            ];

            setMenu(fullData.data.data);
            setCategoriesWithWines(itemsAndCategories);
          }
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);
  if (loading) {
    return <LoadingCatalog />;
  }

  if (!menu) {
    return (
      <div className="error-state flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Error al cargar el catálogo
          </h2>
          <p className="text-gray-500">
            No se pudo cargar la información del menú de vinos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wine-catalog min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <CatalogHeader
          title={menu.title || "Catálogo de Vinos Premium"}
          logo={menu.logo}
        />

        <main className="catalog-content mt-12">
          {categoriesWithWines.length > 0 ? (
            categoriesWithWines.map(({ category, wines }) => (
              <div key={category.id}>
                <br />
                <CategorySection
                  key={category.id}
                  category={category}
                  wines={wines}
                />
                <br />
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🍷</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No se encontraron vinos
              </h3>
              <p className="text-gray-500">
                Revisa la consola del navegador para más información.
              </p>
            </div>
          )}
        </main>

        <CatalogFooter />
      </div>
    </div>
  );
}
