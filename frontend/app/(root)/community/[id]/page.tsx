"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPublicDeck, copyDeck } from "../../../../services/deckService";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import Link from "next/link";
import toast from "react-hot-toast";

type Deck = {
  _id: string;
  title: string;
  description?: string;
  owner?: { name?: string };
  tags?: string[];
  cardCount: number;
  createdAt: string;
  updatedAt: string;
};

type Card = {
  _id: string;
  question: string;
  answer: string;
};

export default function PublicDeckDetailPage() {
  const params = useParams();
  const deckId = params.id as string;
  const router = useRouter();
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        setLoading(true);
        const response = await getPublicDeck(deckId);
        setDeck(response.data.deck);
        setCards(response.data.cards.cards.slice(0, 5)); // Show only first 5 cards as preview
        setError(null);
      } catch (err) {
        console.error("Error fetching public deck:", err);
        setError("Failed to load deck. Please try again later.");
        toast.error("Failed to load deck data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeckData();
  }, [deckId]);

  const handleCopyDeck = async () => {
    try {
      setIsCopying(true);
      await copyDeck(deckId);
      toast.success("Deck successfully copied to your collection!");
      router.push("/decks");
    } catch (err) {
      console.error("Error copying deck:", err);
      toast.error("Failed to copy deck. Please try again.");
    } finally {
      setIsCopying(false);
    }
  };

  const handleShareDeck = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard!");
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oceanBlue"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !deck) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-[22px] font-montserrat">
            {error || "Deck not found"}
          </div>
          <Link
            href="/community"
            className="mt-4 text-oceanBlue hover:text-button font-montserrat flex items-center"
          >
            ← Back to Community Decks
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/community"
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
          Back to Community Decks
        </Link>
        
        <div className="bg-white shadow-md rounded-[22px] overflow-hidden border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-title font-bricolage">
                {deck.title}
              </h1>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800 font-montserrat">
                Public
              </span>
            </div>
            
            <p className="text-gray-700 mb-2 font-montserrat">
              Created by: {deck.owner?.name || "Unknown user"}
            </p>
            
            <p className="text-gray-600 mb-6 font-montserrat">
              {deck.description || "No description provided"}
            </p>
            
            {deck.tags && deck.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {deck.tags.map((tag: string, idx: number) => (
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
                  {deck.cardCount || cards.length || 0}
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
              onClick={handleCopyDeck}
              disabled={isCopying}
              className={`flex-1 py-2 px-4 rounded-[22px] transition-colors shadow-md flex items-center justify-center font-poppins
                bg-green-500 hover:bg-green-600 text-white ${
                isCopying ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isCopying ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Copying...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
            
            <button
              onClick={handleShareDeck}
              className="flex-1 py-2 px-4 bg-oceanBlue hover:bg-button text-white rounded-[22px] transition-colors shadow-md flex items-center justify-center font-poppins"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Deck
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 font-bricolage">Card Preview</h2>
          
          {cards.length > 0 ? (
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div key={card._id} className="bg-white rounded-[22px] shadow-md p-5">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-oceanBlue font-medium font-montserrat">Card {index + 1}</h3>
                    <span className="text-gray-500 text-sm font-montserrat">Preview</span>
                  </div>
                  <p className="font-semibold mb-3 font-montserrat">{card.question}</p>
                  <div className="bg-gray-50 p-3 rounded-[22px]">
                    <p className="text-gray-700 font-montserrat">{card.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[22px] p-6 text-center">
              <p className="text-gray-500 font-montserrat">No cards available for preview</p>
            </div>
          )}
          
          {deck.cardCount > cards.length && (
            <div className="text-center mt-4 text-oceanBlue font-montserrat">
              ...and {deck.cardCount - cards.length} more cards
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}