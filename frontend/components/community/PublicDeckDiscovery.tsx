"use client";
import { useEffect, useState } from "react";
import { getPublicDecks } from "../../services/deckService";
import PublicDeckItem from "./publicDeckItem";
import SearchBar from "./searchBar";
import FilterSection from "./filterSection";
import toast from "react-hot-toast";
import { Deck } from "../../types/deckTypes";

const PublicDeckDiscovery = () => {
  const [publicDecks, setPublicDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDecks, setTotalDecks] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const ITEMS_PER_PAGE = 9;

  const fetchPublicDecks = async (
    page: number,
    search: string = "",
    tag: string = ""
  ) => {
    try {
      setLoading(true);
      const response = await getPublicDecks(page, ITEMS_PER_PAGE, search, tag);

      setPublicDecks(response.data.decks);
      setTotalPages(response.totalPages);
      setTotalDecks(response.totalDecks);
      setCurrentPage(response.currentPage);
      setError(null);
    } catch (err) {
      console.error("Error fetching public decks:", err);
      setError("Failed to load community decks. Please try again later.");
      toast.error("Failed to load community decks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicDecks(currentPage, searchQuery, selectedTag);
  }, [currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchPublicDecks(1, query, selectedTag);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setCurrentPage(1);
    fetchPublicDecks(1, searchQuery, tag === selectedTag ? "" : tag);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTag("");
    setCurrentPage(1);
    fetchPublicDecks(1);
  };

  // Pagination controls component
  const PaginationControls = () => {
    return (
      <div className="mt-8 flex flex-col items-center gap-4 font-montserrat">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-[22px] ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-oceanBlue hover:bg-button text-white"
            }`}
          >
            Previous
          </button>

          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-[22px] ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-oceanBlue hover:bg-button text-white"
            }`}
          >
            Next
          </button>
        </div>
        <div className="text-gray-300 text-sm">
          Total Public Decks: {totalDecks}
        </div>
      </div>
    );
  };

  if (loading && publicDecks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oceanBlue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-bricolage">
            Community Decks
          </h1>
          <p className="text-gray-300 mt-1 font-montserrat">
            Discover and learn from decks shared by the Memory Ball community
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>
          <FilterSection
            selectedTag={selectedTag}
            onTagSelect={handleTagFilter}
            onClearFilters={handleClearFilters}
          />
        </div>
        {(searchQuery || selectedTag) && (
          <div className="mt-3 flex items-center">
            <span className="text-white mr-2 font-montserrat text-sm">
              Active filters:
            </span>
            {searchQuery && (
              <span className="bg-oceanBlue/20 text-white text-xs px-3 py-1 rounded-full font-montserrat mr-2 flex items-center">
                Search: {searchQuery}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    fetchPublicDecks(1, "", selectedTag);
                  }}
                  className="ml-2 hover:text-gray-200"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="bg-oceanBlue/20 text-white text-xs px-3 py-1 rounded-full font-montserrat flex items-center">
                Tag: {selectedTag}
                <button
                  onClick={() => {
                    setSelectedTag("");
                    fetchPublicDecks(1, searchQuery, "");
                  }}
                  className="ml-2 hover:text-gray-200"
                >
                  ✕
                </button>
              </span>
            )}
            {(searchQuery || selectedTag) && (
              <button
                onClick={handleClearFilters}
                className="text-oceanBlue hover:text-button text-xs ml-3 font-montserrat"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-[22px] my-4 font-montserrat">
          {error}
        </div>
      ) : publicDecks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[22px] p-8 text-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-oceanBlue mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h2 className="text-xl font-semibold text-title mb-2">
            No public decks found
          </h2>
          <p className="text-gray-600 mb-6">
            {searchQuery || selectedTag
              ? "Try different search terms or filters"
              : "Be the first to share a deck with the community!"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicDecks.map((deck) => (
              <PublicDeckItem key={deck._id} deck={deck} />
            ))}
          </div>

          {totalPages > 1 && <PaginationControls />}
        </>
      )}
    </div>
  );
};

export default PublicDeckDiscovery;
