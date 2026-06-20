import ListingsGrid from "./components/listings/ListingsGrid";
import { mockListings } from "./data/mockListings";

function App() {
  return (
    <div>
      <h1 style={{ padding: 16 }}>Watch Discovery Tool</h1>

      <ListingsGrid watches={mockListings} />
    </div>
  );
}

export default App;