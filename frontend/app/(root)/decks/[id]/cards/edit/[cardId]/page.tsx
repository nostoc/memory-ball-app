"use client";
import CardForm from "../../../../../../../components/card/cardForm";
import ProtectedRoute from "../../../../../../../components/ProtectedRoute";
import { useParams } from "next/navigation";

export default function EditCardPage() {
  const params = useParams();
  const deckId = params.id as string;
  const cardId = params.cardId as string;

  return (
    <ProtectedRoute>
      <main>
        <CardForm deckId={deckId} cardId={cardId} />
      </main>
    </ProtectedRoute>
  );
}
