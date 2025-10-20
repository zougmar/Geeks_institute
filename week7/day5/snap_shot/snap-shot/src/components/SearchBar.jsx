import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex items-center w-full max-w-md border rounded-md">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-3 py-2 outline-none"
      />
      <button type="submit" className="bg-blue-900 text-white px-3 py-2 rounded-r hover:bg-blue-700">
        <Search size={18} />
      </button>
    </form>
  );
}
