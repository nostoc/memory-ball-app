import { useRouter } from "next/navigation";
import { Deck } from "../../types/deckTypes";
import { copyDeck } from "../../services/deckService";
import { useState } from "react";
import toast from "react-hot-toast";

interface PublicDeckItemProps {
  deck: Deck;
}

const PublicDeckItem: React.FC<PublicDeckItemProps> = ({ deck }) => {
  const router = useRouter();
  const [isCopying, setIsCopying] = useState(false);

  const handleViewDeck = () => {
    router.push(`/community/${deck._id}`);
  };

  const handleCopyDeck = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to deck details

    try {
      setIsCopying(true);
      await copyDeck(deck._id);
      toast.success("Deck successfully copied to your collection!");
      router.push("/decks");
    } catch (err) {
      console.error("Error copying deck:", err);
      toast.error("Failed to copy deck. Please try again.");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="bg-white rounded-[22px] shadow-md border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-oceanBlue/30">
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-title mb-2 flex-grow font-bricolage line-clamp-1">
            {deck.title}
          </h3>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 font-montserrat whitespace-nowrap ml-2">
            Public
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-2 font-montserrat">
          By {deck.owner?.name || "Unknown user"}
        </p>

        <p className="text-gray-600 mb-4 line-clamp-2 font-montserrat min-h-[40px]">
          {deck.description || "No description provided"}
        </p>

        {deck.tags && deck.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {deck.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-oceanBlue text-xs px-2 py-1 rounded-full font-montserrat"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center text-sm text-gray-500 font-montserrat">
          <span className="flex items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            {deck.cardCount || 0} cards
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(deck.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between">
        <button
          onClick={handleViewDeck}
          className="text-white bg-oceanBlue hover:bg-button text-sm font-poppins px-3 py-1 rounded-[22px] transition shadow-sm flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </button>
        <button
          onClick={handleCopyDeck}
          disabled={isCopying}
          className={`text-white bg-green-500 hover:bg-green-600 text-sm font-poppins px-3 py-1 rounded-[22px] transition shadow-sm flex items-center ${
            isCopying ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isCopying ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></span>
              Copying...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy to My Decks
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PublicDeckItem;
