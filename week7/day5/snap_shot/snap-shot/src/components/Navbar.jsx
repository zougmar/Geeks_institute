import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const navigate = useNavigate();
  const categories = ["Mountain", "Beaches", "Birds", "Food"];

  return (
    <header className="flex flex-col items-center py-6">
      <h1
        className="text-4xl font-extrabold text-blue-900 cursor-pointer font-serif"
        onClick={() => navigate("/")}
      >
        SnapShot
      </h1>
      <SearchBar />
      <div className="mt-3 flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
            className="bg-blue-900 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-all"
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}
