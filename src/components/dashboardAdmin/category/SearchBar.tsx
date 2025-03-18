"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import debounce from "lodash.debounce";
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
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", search);
    }
    params.delete("page");

    const newUrl = `${basePath}${params.toString() ? "?" + params.toString() : ""}`;
    router.push(newUrl);
  }, [router, searchParams, basePath]);

  const debouncedUpdate = debounce(updateSearchParams, 1500);

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
    <div className="flex items-center border p-2 rounded w-full md:w-1/3 max-w-md">
      <input
        type="text"
        placeholder="Search Category..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          debouncedUpdate(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        className="text-gray-500 flex-1 p-2 outline-none"
      />
      {searchQuery && (
        <button onClick={clearSearch} className="text-gray-500 hover:text-gray-700 p-1">
          <IoClose className="h-5 w-5" />
        </button>
      )}
      <button onClick={handleSearch} className="text-blue-500 hover:text-blue-700 p-1">
        <FiSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;