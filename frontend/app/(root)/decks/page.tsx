
import { Metadata } from "next";
import DeckList from "../../../components/deck/deckList";
import ProtectedRoute from "../../../components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Decks",
}

export default function DecksPage() {
  return (
    <ProtectedRoute>
      <main>
        <DeckList />
      </main>
    </ProtectedRoute>
  );
}
