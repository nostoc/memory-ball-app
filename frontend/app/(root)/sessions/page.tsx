
import { Metadata } from "next";
import ProtectedRoute from "../../../components/ProtectedRoute";
import SessionHistory from "../../../components/study-features/sessionHistory";

export const metadata: Metadata = {
  title: "Session History",
}

export default function SessionsPage() {
  return (
    <ProtectedRoute>
      <main>
        <SessionHistory />
      </main>
    </ProtectedRoute>
  );
}
