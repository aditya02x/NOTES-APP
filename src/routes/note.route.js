import express from 'express';
import {createNote, getNotes, deleteNote } from '../controllers/note.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// create note
router.post('/', protect, createNote);

// get notes
router.get('/', protect, getNotes);

// delete note
router.delete('/:id', protect, deleteNote);

export default router;