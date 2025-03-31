"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createDeck,
  getDeckById,
  updateDeck,
} from "../../services/deckService";
import { DeckFormData } from "../../types/deckTypes";

interface DeckFormProps {
  deckId?: string; // Optional - if provided, we're editing an existing deck
}

const DeckForm: React.FC<DeckFormProps> = ({ deckId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagsString, setTagsString] = useState(""); // Add this state
  const [formData, setFormData] = useState<DeckFormData>({
    title: "",
    description: "",
    isPublic: false,
    tags: [],
  });

  // If deckId is provided, fetch the deck data
  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;

      try {
        setLoading(true);
        const response = await getDeckById(deckId);
        const deck = response.data.deck;

        setFormData({
          title: deck.title,
          description: deck.description || "",
          isPublic: deck.isPublic,
          tags: deck.tags || [],
        });

        // Initialize tags string for edit mode
        if (deck.tags && Array.isArray(deck.tags)) {
          setTagsString(deck.tags.join(", "));
        }
      } catch (err) {
        console.error("Error fetching deck:", err);
        setError("Failed to load deck data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Modified tags handling
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the raw string state
    const rawInput = e.target.value;
    setTagsString(rawInput);

    // Process tags for the form data
    const tagsArray = rawInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Process tags one final time before submission
    const processedFormData = {
      ...formData,
      tags: tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    try {
      if (deckId) {
        // Update existing deck
        await updateDeck(deckId, processedFormData);
      } else {
        // Create new deck
        await createDeck(processedFormData);
      }

      router.push("/decks");
    } catch (err) {
      console.error("Error saving deck:", err);
      setError("Failed to save deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component unchanged...

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-poppins">
      {/* No changes to this part */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white font-bricolage">
          {deckId ? "Edit Deck" : "Create New Deck"}
        </h1>
        <p className="text-white mt-2 font-montserrat">
          {deckId
            ? "Update your deck information"
            : "Create a new deck to organize your flashcards"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-[22px] mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-[22px] p-6 border border-gray-200"
      >
        {/* Form fields unchanged except for tags */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-title font-medium mb-2 font-montserrat"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-[22px] focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
            placeholder="Enter deck title"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-title font-medium mb-2 font-montserrat"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-[22px] focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
            placeholder="Describe your deck (optional)"
          />
        </div>

        <div className="mb-5">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-5 w-5 text-oceanBlue rounded focus:ring-oceanBlue border-gray-300"
            />
            <span className="ml-2 text-title font-montserrat">
              Make deck public
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-1 ml-7 font-montserrat">
            Public decks can be viewed by other users
          </p>
        </div>

        {/* Modified tags input */}
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-title font-medium mb-2 font-montserrat"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tagsString} // Use the raw string state here
            onChange={handleTagsChange}
            placeholder="e.g. history, science, math"
            className="w-full px-4 py-2 border border-gray-300 rounded-[22px] focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1 font-montserrat">
            Tags help organize and find your decks
          </p>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/decks")}
            className="px-4 py-2 text-title border border-gray-300 rounded-[22px] hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-button hover:bg-oceanBlue text-white rounded-[22px] transition duration-300 
                       flex items-center justify-center ${
                         loading ? "opacity-70 cursor-not-allowed" : ""
                       }`}
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Saving...
              </>
            ) : deckId ? (
              "Update Deck"
            ) : (
              "Create Deck"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckForm;
