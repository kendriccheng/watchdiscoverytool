const fs = require("fs");
const path = require("path");

const structure = {
  "src/app": ["App.tsx", "AppLayout.tsx"],
  "src/pages": ["DiscoveryPage.tsx", "MyListsPage.tsx"],
  "src/components/layout": ["Header.tsx", "PageContainer.tsx"],
  "src/components/listings": ["ListingsGrid.tsx", "WatchCard.tsx"],
  "src/components/search": ["SearchBar.tsx"],
  "src/components/lists": ["ListView.tsx", "ListSidebar.tsx"],
  "src/components/ui": ["Button.tsx", "Modal.tsx"],
  "src/features/search": ["useSearch.ts"],
  "src/features/listings": ["useListings.ts"],
  "src/features/lists": ["useWatchLists.ts"],
  "src/data": ["mockListings.ts"],
  "src/types": ["watch.ts", "list.ts"],
  "src/utils": ["filterListings.ts", "formatPrice.ts"],
  "src/hooks": ["useLocalStorage.ts"]
};

function createStructure() {
  Object.entries(structure).forEach(([folder, files]) => {
    const dir = path.join(__dirname, folder);

    fs.mkdirSync(dir, { recursive: true });

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "// TODO: implement\n");
      }
    });
  });

  console.log("✅ Project structure created");
}

createStructure();