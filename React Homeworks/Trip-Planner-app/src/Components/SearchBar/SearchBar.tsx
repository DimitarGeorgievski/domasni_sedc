import { useEffect, useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (input: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
        onSearch(value)
    }, 500);
    return () => {
        clearTimeout(timer);
    }
  }, [value])
  return (
    <div className="searchInput">
      <input
        type="text"
        value={value}
        placeholder="Search by countries..."
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
