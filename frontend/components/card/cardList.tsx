"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCardsByDeck, deleteCard } from "../../services/cardService";
import { Card } from "../../types/cardTypes";
import CardItem from "./cardItem";
import Link from "next/link";
import toast from "react-hot-toast";

interface CardListProps {
  deckId: string;
}

const CardList: React.FC<CardListProps> = ({ deckId }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCards = useCallback(async () => {
  try {
    setLoading(true);
    const response = await getCardsByDeck(deckId);

    // Fix: The response is already response.data from the service
    if (response?.data?.cards) {
      setCards(response.data.cards);
    } else {
      setCards([]);
    }

    setError(null);
  } catch (err) {
    console.error("Error fetching cards:", err);
    setError("Failed to load cards. Please try again later.");
    toast.error("Failed to load cards");
  } finally {
    setLoading(false);
  }
}, [deckId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleCreateCard = () => {
    router.push(`/decks/${deckId}/cards/new`);
  };

  const handleEditCard = (cardId: string) => {
    router.push(`/decks/${deckId}/cards/edit/${cardId}`);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(cardId);
        toast.success("Card deleted successfully");
        fetchCards(); // Refresh list after deletion
      } catch (err) {
        console.error("Error deleting card:", err);
        setError("Failed to delete card. Please try again.");
        toast.error("Failed to delete card");
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-[22px] font-montserrat">
          {error}
        </div>
        <button
          onClick={() => router.push(`/decks/${deckId}`)}
          className="mt-4 text-oceanBlue hover:text-button font-montserrat flex items-center transition-colors"
        >
          ← Back to Deck
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          href={`/decks/${deckId}`}
          className="text-oceanBlue hover:text-button font-montserrat flex items-center transition-colors"
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
          Back to Deck
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-[22px] overflow-hidden border border-gray-200 mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-title mb-2 font-bricolage">
            Cards
          </h2>
          <p className="text-gray-600 mb-4 font-montserrat">
            Manage the flashcards in this deck
          </p>
          <button
            onClick={handleCreateCard}
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
            Add New Card
          </button>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[22px] p-8 text-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-oceanBlue/40 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg text-title mb-4 font-montserrat">
            This deck doesn&apos;t have any cards yet. Add your first card to
            start studying!
          </p>
          <button
            onClick={handleCreateCard}
            className="bg-oceanBlue hover:bg-button text-white font-poppins py-2 px-6 rounded-[22px] 
                     transition duration-200 shadow-md"
          >
            Add Your First Card
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-white font-montserrat">
              {cards.length} card{cards.length !== 1 ? "s" : ""} in this deck
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card) => (
              <CardItem
                key={card._id}
                card={card}
                onEdit={() => handleEditCard(card._id)}
                onDelete={() => handleDeleteCard(card._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
