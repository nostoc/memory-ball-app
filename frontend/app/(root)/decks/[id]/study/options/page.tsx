"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../../../../components/ProtectedRoute";
import StudyOptionsForm from "../../../../../../components/study-features/studyOptions";
import {
  getCardsForStudy,
  getDueCards,
} from "../../../../../../services/studySessionService";
import { useParams } from "next/navigation";

export default function StudyOptionsPage() {
  const params = useParams();
  const deckId = params.id as string;

  
  const [totalCards, setTotalCards] = useState(0);
  const [dueCards, setDueCards] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardCounts = async () => {
      try {
        setLoading(true);

        // Get total cards
        const cardsResponse = await getCardsForStudy(deckId);
        if (cardsResponse?.data?.cards) {
          setTotalCards(cardsResponse.data.cards.length);
        }

        // Get due cards
        try {
          const dueResponse = await getDueCards(deckId);
          if (dueResponse?.data?.cards) {
            setDueCards(dueResponse.data.cards.length);
          }
        } catch (error) {
          console.log(error);
          // If due cards endpoint doesn't exist yet, just set to 0
          console.warn("Due cards endpoint may not be implemented yet");
          setDueCards(0);
        }
      } catch (err) {
        console.error("Error fetching card counts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCardCounts();
  }, [deckId]);

  return (
    <ProtectedRoute>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StudyOptionsForm
            deckId={deckId}
            totalCards={totalCards}
            dueCards={dueCards}
          />
        )}
      </main>
    </ProtectedRoute>
  );
}
