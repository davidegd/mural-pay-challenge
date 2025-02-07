import { Button, Input } from "@heroui/react";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by transaction hash..."
          value={query}
          variant="bordered"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full focus:outline-none focus:ring-1 "
        />
        <Button
          variant="light"
          type="submit"
          radius="none"
          className="absolute right-0 top-0 text-gray-500 hover:text-indigo-500 hover:bg-transparent"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
