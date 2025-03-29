"use client";
import { useParams } from "next/navigation";
import DeckForm from "../../../../../components/deck/deckForm";
import ProtectedRoute from "../../../../../components/ProtectedRoute";

export default function EditDeckPage() {
  const params = useParams();
  const deckId = params.id as string;
  return (
    <ProtectedRoute>
      <main>
        <DeckForm deckId={deckId} />
      </main>
    </ProtectedRoute>
  );
}
