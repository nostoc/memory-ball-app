import { useState } from "react";

// Common tags for filtering
const POPULAR_TAGS = [
  "languages",
  "math",
  "science",
  "history",
  "programming",
  "medicine",
  "art",
  "music",
  "literature",
  "geography",
];

interface FilterSectionProps {
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  onClearFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedTag,
  onTagSelect,
  onClearFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-[22px]
                  hover:bg-white/20 transition font-montserrat flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Filter
        {selectedTag && (
          <span className="ml-2 bg-oceanBlue text-white text-xs px-2 py-0.5 rounded-full">
            1
          </span>
        )}
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-white/20 rounded-[22px] shadow-lg z-10 overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium font-bricolage">
                Popular Tags
              </h3>
              {selectedTag && (
                <button
                  onClick={onClearFilters}
                  className="text-oceanBlue hover:text-button text-xs font-montserrat"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagSelect(tag)}
                  className={`text-xs px-3 py-1 rounded-full transition font-montserrat ${
                    selectedTag === tag
                      ? "bg-oceanBlue text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
