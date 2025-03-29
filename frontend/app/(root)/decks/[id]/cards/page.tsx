"use client";
import CardList from "../../../../../components/card/cardList";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import { useParams } from "next/navigation";

export default function CardsPage() {
  const params = useParams();
  const deckId = params.id as string;

  return (
    <ProtectedRoute>
      <main>
        <CardList deckId={deckId} />
      </main>
    </ProtectedRoute>
  );
}
