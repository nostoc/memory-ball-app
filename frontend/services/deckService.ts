import api from '../utils/api';

// Get all decks for the current user
export const getAllDecks = async (page = 1, limit = 9) => {
  const response = await api.get(`/v1/decks?page=${page}&limit=${limit}`);
  return response.data;
};

// Get a single deck by ID
export const getDeckById = async (id: string) => {
  const response = await api.get(`/v1/decks/${id}`);
  return response.data;
};

// Create a new deck
export const createDeck = async (deckData: {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
}) => {
  const response = await api.post('/v1/decks', deckData);
  return response.data;
};

// Update an existing deck
export const updateDeck = async (
  id: string,
  deckData: {
    title?: string;
    description?: string;
    isPublic?: boolean;
    tags?: string[];
  }
) => {
  const response = await api.patch(`/v1/decks/${id}`, deckData);
  return response.data;
};

// Delete a deck
export const deleteDeck = async (id: string) => {
  const response = await api.delete(`/v1/decks/${id}`);
  return response.data;
};

// Get deck statistics
export const getDeckStats = async (id: string) => {
  const response = await api.get(`/v1/decks/${id}/stats`);
  return response.data;
};

// Add these functions to your existing deckService.ts

// Get public decks
export const getPublicDecks = async (page = 1, limit = 9, search = '', tag = '') => {
  let url = `/v1/decks/public?page=${page}&limit=${limit}`;
  
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (tag) url += `&tag=${encodeURIComponent(tag)}`;
  
  const response = await api.get(url);
  return response.data;
};

// Get a specific public deck
export const getPublicDeck = async (id: string) => {
  const response = await api.get(`/v1/decks/public/${id}`);
  return response.data;
};

// Copy a public deck to user's collection
export const copyDeck = async (id: string) => {
  const response = await api.post(`/v1/decks/copy/${id}`);
  return response.data;
};