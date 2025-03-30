"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../types/cardTypes";
import { Session } from "../../types/studySessionTypes";
import {
  startStudySession,
  getCardsForStudy,
  recordCardResult,
  endStudySession,
} from "../../services/studySessionService";
import StudyCard from "./studyCard";
import StudySummary from "./studySummary";
import toast from "react-hot-toast";

interface StudySessionProps {
  deckId: string;
}

const StudySession: React.FC<StudySessionProps> = ({ deckId }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [, setStartTime] = useState(Date.now());
  const [cardStartTime, setCardStartTime] = useState(Date.now());
  const [sessionSummary, setSessionSummary] = useState<Session | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeStudySession = async () => {
      try {
        setLoading(true);

        // 1. Fetch the cards for study
        const cardsResponse = await getCardsForStudy(deckId);

        if (cardsResponse?.data?.cards && cardsResponse.data.cards.length > 0) {
          setCards(cardsResponse.data.cards);
          toast.success("Study session loaded successfully");
        } else {
          setError("No cards available for study in this deck.");
          toast.error("No cards available for study");
          setLoading(false);
          return;
        }

        // 2. Start a new study session
        const sessionResponse = await startStudySession(deckId);

        if (sessionResponse?.data?.session?._id) {
          setSessionId(sessionResponse.data.session._id);
        } else {
          setError("Failed to start study session.");
          toast.error("Failed to start study session");
        }
      } catch (err) {
        console.error("Error initializing study session:", err);
        setError("Failed to initialize study session. Please try again.");
        toast.error("Failed to initialize study session");
      } finally {
        setLoading(false);
      }
    };

    initializeStudySession();

    // Set these once when the effect runs, not in the async function
    setStartTime(Date.now());
    setCardStartTime(Date.now());
  }, [deckId]);

  const handleCardResult = async (isCorrect: boolean) => {
    if (!sessionId || currentCardIndex >= cards.length) return;

    const card = cards[currentCardIndex];
    const timeSpent = Date.now() - cardStartTime;

    try {
      // Record the result
      await recordCardResult(sessionId, card._id, isCorrect, timeSpent);

      // Move to the next card or finish the session
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setCardStartTime(Date.now());
        setShowAnswer(false); // Reset to question side for next card
      } else {
        await finishSession();
      }
    } catch (err) {
      console.error("Error recording card result:", err);
      toast.error("Error recording result, but continuing");

      // Move on anyway
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setCardStartTime(Date.now());
        setShowAnswer(false); // Reset to question side for next card
      } else {
        await finishSession();
      }
    }
  };

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const finishSession = async () => {
    if (!sessionId) return;

    try {
      const response = await endStudySession(sessionId);

      if (response?.data?.session) {
        setSessionSummary(response.data.session);
        toast.success("Study session completed!");
      }
    } catch (err) {
      console.error("Error ending study session:", err);
      toast.error("Error ending session, but showing summary");
    }

    setIsFinished(true);
  };

  const handleBackToDeck = () => {
    router.push(`/decks/${deckId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oceanBlue"></div>
          <p className="text-white font-montserrat">Loading study session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-[22px] mb-6 w-full max-w-md text-center font-montserrat">
          <p>{error}</p>
        </div>
        <button
          onClick={handleBackToDeck}
          className="bg-oceanBlue hover:bg-button text-white font-poppins py-2 px-6 rounded-[22px] 
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
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Deck
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <StudySummary session={sessionSummary} onBackToDeck={handleBackToDeck} />
    );
  }

  if (cards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-[22px] mb-6 w-full max-w-md text-center font-montserrat">
          <p>No cards available for study in this deck.</p>
        </div>
        <button
          onClick={handleBackToDeck}
          className="bg-oceanBlue hover:bg-button text-white font-poppins py-2 px-6 rounded-[22px] 
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
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Deck
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBackToDeck}
          className="text-oceanBlue hover:text-button font-montserrat flex items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Exit Session
        </button>

        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 h-1.5 w-48 sm:w-64 rounded-full overflow-hidden">
            <div
              className="bg-oceanBlue h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentCardIndex / cards.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-white font-montserrat">
            {currentCardIndex + 1}/{cards.length}
          </span>
        </div>
      </div>

      <div className="mb-8" onClick={handleFlipCard}>
        <StudyCard card={cards[currentCardIndex]} isFlipped={showAnswer} />
      </div>

      {showAnswer ? (
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => handleCardResult(false)}
            className="bg-red-500 hover:bg-red-600 text-white font-poppins py-3 px-8 rounded-[22px] 
                     transition duration-200 shadow-md flex-1 sm:flex-initial flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Incorrect
          </button>
          <button
            onClick={() => handleCardResult(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-poppins py-3 px-8 rounded-[22px] 
                     transition duration-200 shadow-md flex-1 sm:flex-initial flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Correct
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handleFlipCard}
            className="bg-oceanBlue hover:bg-button text-white font-poppins py-3 px-8 rounded-[22px] 
                     transition duration-200 shadow-md flex items-center justify-center"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;
