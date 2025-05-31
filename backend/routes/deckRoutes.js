const express = require('express');
const deckController = require('../controllers/deckController');
const { protect } = require("../middleware/authMiddleware");
const cardRouter = require('./cardRoutes');
const sessionRouter = require('./sessionRoutes');

const router = express.Router();

// Public routes that don't require authentication
router.get('/public', deckController.getPublicDecks);
router.get('/public/:id', deckController.getPublicDeck);

// Protect all routes after this middleware
router.use(protect);

// Copy a public deck to user's collection (requires authentication)
router.post('/copy/:id', deckController.copyDeck);

// Re-route to card router if the URL contains cardId
router.use('/:deckId/cards', cardRouter);

// Re-route to session router if the URL contains sessionId
router.use('/:deckId/sessions', sessionRouter);

router
  .route('/')
  .get(deckController.getAllDecks)
  .post(deckController.createDeck);

router
  .route('/:id')
  .get(deckController.getDeck)
  .patch(deckController.updateDeck)
  .delete(deckController.deleteDeck);

router
  .route('/:id/stats')
  .get(deckController.getDeckStats);

module.exports = router;
