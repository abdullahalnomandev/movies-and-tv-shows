import express from "express";
import { createReviews, getAllReviews } from "../controllers/reviewController.js";
import VerifyToken from "../middleware/VerifyToken.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

// Upload files
router.post('/', VerifyToken, authorization('user'), createReviews)
router.get('/', VerifyToken, authorization('user', 'admin'), getAllReviews)


export default router;
