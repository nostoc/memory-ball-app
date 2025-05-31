import { Metadata } from "next";
import PublicDeckDiscovery from "../../../components/community/PublicDeckDiscovery";
import ProtectedRoute from "../../../components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Community Decks",
};

export default function CommunityPage() {
  return (
    <ProtectedRoute>
      <main>
        <PublicDeckDiscovery />
      </main>
    </ProtectedRoute>
  );
}
