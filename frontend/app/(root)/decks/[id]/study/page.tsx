"use client";
import StudySession from "../../../../../components/study-session/studySession";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import { useParams } from "next/navigation";

export default function StudyPage() {
  const params = useParams();
  const deckId = params.id as string;

  return (
    <ProtectedRoute>
      <main>
        <StudySession deckId={deckId} />
      </main>
    </ProtectedRoute>
  );
}
