"use client";
import CardForm from "../../../../../../components/card/cardForm";
import ProtectedRoute from "../../../../../../components/ProtectedRoute";
import { useParams } from "next/navigation";

export default function NewCardPage() {
  const params = useParams();
  const deckId = params.id as string;

  return (
    <ProtectedRoute>
      <main>
        <CardForm deckId={deckId} />
      </main>
    </ProtectedRoute>
  );
}
