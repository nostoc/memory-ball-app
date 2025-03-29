"use client";
import { useParams } from "next/navigation";
import DeckDetail from "../../../../components/deck/deckDetail";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function ViewDeckPage() {
  const params = useParams();
  const deckId = params.id as string;
  return (
    <ProtectedRoute>
      <main>
        <DeckDetail deckId={deckId} />
      </main>
    </ProtectedRoute>
  );
}
