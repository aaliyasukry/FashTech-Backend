const express = require('express');
const router = express.Router();
const piecesController = require('../controllers/pieceController');

// Create a new piece
router.post('/', piecesController.createPiece);

// Get all pieces
router.get('/', piecesController.getAllPieces);

// Get piece by ID
router.get('/:id', piecesController.getPieceById);

// Update a piece
router.put('/:id', piecesController.updatePiece);

// Delete a piece
router.delete('/:id', piecesController.deletePiece);

module.exports = router;
