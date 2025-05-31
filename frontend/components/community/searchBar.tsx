import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search decks by title or description..."
          className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 text-white 
                     rounded-[22px] focus:outline-none focus:ring-2 focus:ring-oceanBlue 
                     focus:border-transparent placeholder-gray-400 font-montserrat"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute right-2 inset-y-0 px-4 py-1 my-1 bg-oceanBlue hover:bg-button text-white 
                   rounded-[22px] transition duration-200 font-montserrat text-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
