
export interface Deck {
  cardCount: number;
  _id: string;
  title: string;
  description?: string;
  owner: {
    _id: string;
    name: string;
  };

  isPublic: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DeckFormData {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
}