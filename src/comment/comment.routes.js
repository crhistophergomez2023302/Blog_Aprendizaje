import { Router } from "express";
import { createComment } from "./comment.controller.js";

const router = Router();

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               publicationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Invalid request
 */
router.post("/createComment", createComment);

export default router;