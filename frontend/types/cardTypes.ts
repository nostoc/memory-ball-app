export interface Card {
  _id: string;
  question: string;
  answer: string;
  deck: string;
  difficulty: number;
  nextReview: string;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardFormData {
  question: string;
  answer: string;
  deck: string;
}

interface PaginatedCardsResponse {
  status: string;
  results: number;
  totalPages: number;
  currentPage: number;
  totalCards: number;
  data: {
    cards: Card[];
  };
}