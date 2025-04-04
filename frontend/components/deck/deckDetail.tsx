"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDeckById,
  getDeckStats,
  deleteDeck,
} from "../../services/deckService";
import { Deck } from "../../types/deckTypes";
import toast from "react-hot-toast";

interface DeckDetailProps {
  deckId: string;
}

const DeckDetail: React.FC<DeckDetailProps> = ({ deckId }) => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [stats, setStats] = useState<{
    cardCount: number;
    deckName: string;
    createdAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        setLoading(true);
        const [deckResponse, statsResponse] = await Promise.all([
          getDeckById(deckId),
          getDeckStats(deckId),
        ]);

        setDeck(deckResponse.data.deck);
        setStats(statsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching deck data:", err);
        setError("Failed to load deck. Please try again later.");
        toast.error("Failed to load deck data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeckData();
  }, [deckId]);

  const handleEdit = () => {
    router.push(`/decks/edit/${deckId}`);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? This will also delete all cards in this deck."
      )
    ) {
      try {
        await deleteDeck(deckId);
        toast.success("Deck deleted successfully");
        router.push("/decks");
      } catch (err) {
        console.error("Error deleting deck:", err);
        setError("Failed to delete deck. Please try again.");
        toast.error("Failed to delete deck");
      }
    }
  };

  const handleManageCards = () => {
    router.push(`/decks/${deckId}/cards`);
  };

  const handleStudyDeck = () => {
    router.push(`/decks/${deckId}/study`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oceanBlue"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-[22px] font-montserrat">
          {error}
        </div>
        <button
          onClick={() => router.push("/decks")}
          className="mt-4 text-oceanBlue hover:text-button font-montserrat flex items-center"
        >
          ← Back to Decks
        </button>
      </div>
    );

  if (!deck)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-[22px] font-montserrat">
          Deck not found
        </div>
        <button
          onClick={() => router.push("/decks")}
          className="mt-4 text-oceanBlue hover:text-button font-montserrat flex items-center"
        >
          ← Back to Decks
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/decks")}
        className="mb-6 text-oceanBlue hover:text-button font-montserrat flex items-center transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Decks
      </button>

      <div className="bg-white shadow-md rounded-[22px] overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-title font-bricolage">
              {deck.title}
            </h1>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full font-montserrat ${
                deck.isPublic
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {deck.isPublic ? "Public" : "Private"}
            </span>
          </div>

          <p className="text-gray-600 mb-6 font-montserrat">
            {deck.description || "No description provided"}
          </p>

          {deck.tags && deck.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-[22px]">
            <div className="flex flex-col items-center p-3 bg-white rounded-[22px] shadow-sm border border-gray-100">
              <span className="text-lg font-semibold text-oceanBlue font-bricolage">
                {stats?.cardCount || 0}
              </span>
              <span className="text-gray-500 text-sm font-montserrat">
                Cards
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-[22px] shadow-sm border border-gray-100">
              <span className="text-gray-600 text-sm font-montserrat">
                Created
              </span>
              <span className="text-gray-900 font-montserrat">
                {new Date(deck.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-[22px] shadow-sm border border-gray-100">
              <span className="text-gray-600 text-sm font-montserrat">
                Last Updated
              </span>
              <span className="text-gray-900 font-montserrat">
                {new Date(deck.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleStudyDeck}
            disabled={stats?.cardCount === 0}
            className={`flex-1 py-2 px-4 rounded-[22px] transition-colors shadow-md flex items-center justify-center font-poppins 
              ${
                stats?.cardCount === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-oceanBlue hover:bg-button text-white"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Study Deck
          </button>
          <button
            onClick={handleManageCards}
            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-[22px] transition-colors shadow-md flex items-center justify-center font-poppins"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Manage Cards
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleEdit}
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-[22px] transition-colors shadow-sm flex items-center font-poppins"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Deck
        </button>
        <button
          onClick={handleDelete}
          className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-[22px] transition-colors shadow-sm flex items-center font-poppins"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Delete Deck
        </button>
      </div>
    </div>
  );
};

export default DeckDetail;
