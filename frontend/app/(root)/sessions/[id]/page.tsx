"use client";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import SessionDetail from "../../../../components/study-features/sessionDetail";
import { useParams } from "next/navigation";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params.id as string;

  return (
    <ProtectedRoute>
      <main>
        <SessionDetail sessionId={sessionId} />
      </main>
    </ProtectedRoute>
  );
}
