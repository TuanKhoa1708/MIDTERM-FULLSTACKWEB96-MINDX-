import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';

import { createPost, updatePosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePosts);

export default router;