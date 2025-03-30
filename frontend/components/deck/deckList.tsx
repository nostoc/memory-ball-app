"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllDecks, deleteDeck } from "../../services/deckService";
import { Deck } from "../../types/deckTypes";
import toast from "react-hot-toast";

const DeckList = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDecks = async () => {
    try {
      setLoading(true);
      const response = await getAllDecks();
      setDecks(response.data.decks);
      setError(null);
    } catch (err) {
      console.error("Error fetching decks:", err);
      setError("Failed to load decks. Please try again later.");
      toast.error("Failed to load decks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleCreateDeck = () => {
    router.push("/decks/new");
  };

  const handleEditDeck = (id: string) => {
    router.push(`/decks/edit/${id}`);
  };

  const handleViewDeck = (id: string) => {
    router.push(`/decks/${id}`);
  };

  const handleDeleteDeck = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? This will also delete all cards in this deck."
      )
    ) {
      try {
        await deleteDeck(id);
        toast.success("Deck deleted successfully");
        fetchDecks(); // Refresh list after deletion
      } catch (err) {
        console.error("Error deleting deck:", err);
        toast.error("Failed to delete deck. Please try again.");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oceanBlue"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-[22px] my-4 font-montserrat">
        {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-bricolage">
          My Decks
        </h1>
        <button
          onClick={handleCreateDeck}
          className="bg-oceanBlue hover:bg-button text-white font-poppins py-2 px-4 rounded-[22px] 
                     transition duration-200 flex items-center shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create New Deck
        </button>
      </div>

      {decks.length === 0 ? (
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
          <p className="text-lg text-title mb-4 font-montserrat">
            You don&apos;t have any decks yet.
          </p>
          <button
            onClick={handleCreateDeck}
            className="bg-oceanBlue hover:bg-button text-white font-poppins py-2 px-6 rounded-[22px] 
                       transition duration-200 shadow-md"
          >
            Create Your First Deck
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck._id}
              className="bg-white rounded-[22px] shadow-md border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-grow">
                <div className="flex items-start">
                  <h3 className="text-xl font-semibold text-title mb-2 flex-grow font-bricolage">
                    {deck.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full font-montserrat ${
                      deck.isPublic
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {deck.isPublic ? "Public" : "Private"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2 font-montserrat">
                  {deck.description || "No description"}
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
                <div className="text-sm text-gray-500 font-montserrat">
                  Created: {new Date(deck.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between">
                <button
                  onClick={() => handleViewDeck(deck._id)}
                  className="text-white bg-oceanBlue hover:bg-button text-sm font-poppins px-3 py-1 rounded-[22px] transition shadow-sm"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditDeck(deck._id)}
                  className="text-white bg-gray-500 hover:bg-gray-600 text-sm font-poppins px-3 py-1 rounded-[22px] transition shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDeck(deck._id)}
                  className="text-white bg-red-500 hover:bg-red-600 text-sm font-poppins px-3 py-1 rounded-[22px] transition shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckList;
