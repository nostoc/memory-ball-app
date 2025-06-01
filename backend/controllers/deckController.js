const Deck = require('../models/deckModel');
const Card = require('../models/cardModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create a new deck
exports.createDeck = catchAsync(async (req, res, next) => {
  // Add the current user as the owner
  req.body.owner = req.user.id;
  
  const deck = await Deck.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      deck
    }
  });
});

// Get all decks for the current user
exports.getAllDecks = catchAsync(async (req, res, next) => {
  // Parse page and limit from query string, set defaults
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 9; // 9 cards per page
  const skip = (page - 1) * limit;

  // Get total count for pagination
  const totalDecks = await Deck.countDocuments({ owner: req.user.id });
  
  // Get paginated decks
  const decks = await Deck.find({ owner: req.user.id })
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(limit);
  
  res.status(200).json({
    status: 'success',
    results: decks.length,
    totalPages: Math.ceil(totalDecks / limit),
    currentPage: page,
    totalDecks,
    data: {
      decks
    }
  });
});

// Get a specific deck by ID
exports.getDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findById(req.params.id).populate('cards');
  
  if (!deck) {
    return next(new AppError('No deck found with that ID', 404));
  }
  
  // Check if the deck belongs to the current user
  if (deck.owner.toString() !== req.user.id && !deck.isPublic) {
    return next(new AppError('You do not have permission to access this deck', 403));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      deck
    }
  });
});

// Update a deck
exports.updateDeck = catchAsync(async (req, res, next) => {
  // Find the deck first to check ownership
  const deck = await Deck.findById(req.params.id);
  
  if (!deck) {
    return next(new AppError('No deck found with that ID', 404));
  }
  
  // Check if the deck belongs to the current user
  if (deck.owner.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to update this deck', 403));
  }
  
  // Update the deck
  const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    status: 'success',
    data: {
      deck: updatedDeck
    }
  });
});

// Delete a deck
exports.deleteDeck = catchAsync(async (req, res, next) => {
  // Find the deck first to check ownership
  const deck = await Deck.findById(req.params.id);

  if (!deck) {
    return next(new AppError("No deck found with that ID", 404));
  }

  // Check if the deck belongs to the current user
  if (deck.owner.toString() !== req.user.id) {
    return next(
      new AppError("You do not have permission to delete this deck", 403)
    );
  }

  // Store the deck title before deletion (for session updates)
  const deckTitle = deck.title;

  // Delete all cards associated with this deck
  await Card.deleteMany({ deck: req.params.id });

  // Update any study sessions that reference this deck
  // We keep the sessions but mark the deck as deleted
  const Session = require("../models/sessionModel");
  await Session.updateMany(
    { deck: req.params.id },
    {
      $set: {
        "deck.title": `${deckTitle} (Deleted)`,
        deckDeleted: true,
      },
    }
  );

  // Delete the deck
  await Deck.findByIdAndDelete(req.params.id);

  res.status(204).json({
  status: "success",
    data: null,
  });
});

// Get deck statistics
exports.getDeckStats = catchAsync(async (req, res, next) => {
  const deck = await Deck.findById(req.params.id);
  
  if (!deck) {
    return next(new AppError('No deck found with that ID', 404));
  }
  
  // Check if the deck belongs to the current user
  if (deck.owner.toString() !== req.user.id && !deck.isPublic) {
    return next(new AppError('You do not have permission to access this deck', 403));
  }
  
  const cardCount = await Card.countDocuments({ deck: req.params.id });
  
  res.status(200).json({
    status: 'success',
    data: {
      cardCount,
      deckName: deck.title,
      createdAt: deck.createdAt
    }
  });
});

// Get all public decks with filtering and pagination
exports.getPublicDecks = catchAsync(async (req, res, next) => {
  // Parse query parameters
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 9;
  const skip = (page - 1) * limit;
  const searchQuery = req.query.search || '';
  const tagFilter = req.query.tag || '';

  // Build query
  let query = { isPublic: true };

  // Add search functionality
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { description: { $regex: searchQuery, $options: 'i' } }
    ];
  }
  
  // Add tag filtering
  if (tagFilter) {
    query.tags = tagFilter;
  }

  // Get total count for pagination
  const totalDecks = await Deck.countDocuments(query);
  
  // Execute query with population of owner's name
  const decks = await Deck.find(query)
    .populate({ path: 'owner', select: 'name' })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Get card count for each deck
  const decksWithCardCount = await Promise.all(
    decks.map(async (deck) => {
      const cardCount = await Card.countDocuments({ deck: deck._id });
      const deckObj = deck.toObject();
      deckObj.cardCount = cardCount;
      return deckObj;
    })
  );
  
  res.status(200).json({
    status: 'success',
    results: decks.length,
    totalPages: Math.ceil(totalDecks / limit),
    currentPage: page,
    totalDecks,
    data: {
      decks: decksWithCardCount
    }
  });
});

// Get a specific public deck with its cards
exports.getPublicDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findById(req.params.id)
    .populate({ path: 'owner', select: 'name' });
  
  if (!deck) {
    return next(new AppError('No deck found with that ID', 404));
  }
  
  if (!deck.isPublic) {
    return next(new AppError('This deck is not public', 403));
  }
  
  // Get cards with pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 cards per page
  const skip = (page - 1) * limit;
  
  const totalCards = await Card.countDocuments({ deck: deck._id });
  const cards = await Card.find({ deck: deck._id })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
  
  res.status(200).json({
    status: 'success',
    data: {
      deck,
      cards: {
        results: cards.length,
        totalPages: Math.ceil(totalCards / limit),
        currentPage: page,
        totalCards,
        cards
      }
    }
  });
});

// Copy a public deck to the user's collection
exports.copyDeck = catchAsync(async (req, res, next) => {
  const originalDeckId = req.params.id;
  
  // Find the original deck
  const originalDeck = await Deck.findById(originalDeckId);
  
  if (!originalDeck) {
    return next(new AppError('No deck found with that ID', 404));
  }
  
  if (!originalDeck.isPublic) {
    return next(new AppError('This deck is not public and cannot be copied', 403));
  }
  
  // Create a new deck with copied properties
  const newDeck = await Deck.create({
    title: `${originalDeck.title} (Copy)`,
    description: originalDeck.description,
    isPublic: false, // Default copied decks to private
    tags: originalDeck.tags,
    owner: req.user.id
  });
  
  // Copy all cards from original deck
  const originalCards = await Card.find({ deck: originalDeckId });
  
  const cardPromises = originalCards.map(card => {
    return Card.create({
      question: card.question,
      answer: card.answer,
      deck: newDeck._id,
      // Reset learning progress for the new user
      difficulty: 0,
      nextReview: new Date(),
      reviewCount: 0
    });
  });
  
  await Promise.all(cardPromises);
  
  res.status(201).json({
    status: 'success',
    message: 'Deck successfully copied to your collection',
    data: {
      deck: newDeck
    }
  });
});