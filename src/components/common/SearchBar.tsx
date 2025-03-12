"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface SearchBarProps {
  basePath: string;
}

const SearchBar = ({ basePath }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQueryFromURL = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(searchQueryFromURL);

  const updateSearchParams = useCallback((search: string) => {
    if (search !== searchParams.get("search")) {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim() === "") {
        params.delete("search");
      } else {
        params.set("search", search);
      }
      params.delete("page");

      const newUrl = `${basePath}${params.toString() ? "?" + params.toString() : ""}`;
      router.push(newUrl);
    }
  }, [router, searchParams, basePath]);

  const handleSearch = () => {
    updateSearchParams(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    updateSearchParams("");
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Search furniture..."
        className="w-full px-10 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-red-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {searchQuery && (
      <button
        onClick={clearSearch}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${
          searchQuery ? "block" : "invisible"
        }`}
      >
        <IoClose className="h-5 w-5" />
      </button>
      )}
    </div>
  );
};

export default SearchBar;