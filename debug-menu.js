// Debug script to check menu structure
const fs = require("fs");

try {
  const menuData = JSON.parse(fs.readFileSync("./app/data/menu.json", "utf8"));

  console.log("=== MENU STRUCTURE DEBUG ===");
  console.log("Status:", menuData.status);
  console.log("Has data:", !!menuData.data);
  console.log("Has data.data:", !!menuData.data?.data);

  if (menuData.data?.data) {
    const actualData = menuData.data.data;
    console.log("Menu ID:", actualData.menu_id);
    console.log("Title:", actualData.title);
    console.log("Items count:", actualData.data?.items?.length || 0);
    console.log("Categories count:", actualData.data?.categories?.length || 0);

    if (actualData.data?.items?.length > 0) {
      console.log("\n=== FIRST WINE EXAMPLE ===");
      const firstWine = actualData.data.items[0];
      console.log("ID:", firstWine.id);
      console.log("Title:", firstWine.title?.translations?.en);
      console.log(
        "Description:",
        firstWine.description?.translations?.en?.substring(0, 100) + "..."
      );
      console.log("Image URL:", firstWine.image_url);
      console.log("Country:", firstWine.product_info?.countries_of_origin?.[0]);
    }

    if (actualData.data?.categories?.length > 0) {
      console.log("\n=== FIRST CATEGORY EXAMPLE ===");
      const firstCategory = actualData.data.categories[0];
      console.log("Category ID:", firstCategory.id);
      console.log("Category Title:", firstCategory.title?.translations?.en);
      console.log("Entities count:", firstCategory.entities?.length || 0);

      if (firstCategory.entities?.length > 0) {
        console.log("First entity ID:", firstCategory.entities[0].id);

        // Check if entity ID matches any item ID
        const matchingItem = actualData.data.items.find(
          (item) => item.id === firstCategory.entities[0].id
        );
        console.log("Matching item found:", !!matchingItem);

        if (!matchingItem) {
          // Try partial match
          const partialMatch = actualData.data.items.find(
            (item) =>
              item.id.includes(firstCategory.entities[0].id) ||
              firstCategory.entities[0].id.includes(item.id)
          );
          console.log("Partial match found:", !!partialMatch);
          if (partialMatch) {
            console.log("Partial match ID:", partialMatch.id);
          }
        }
      }
    }
  }
} catch (error) {
  console.error("Error reading menu:", error.message);
}
