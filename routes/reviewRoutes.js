import express from "express";
import { createMovies, getAllMovies } from "../controllers/movieController.js";
import VerifyToken from "../middleware/VerifyToken.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

// Upload files
router.post('/', VerifyToken, authorization('user'), createMovies)
router.get('/', VerifyToken, authorization('user', 'admin'), getAllMovies)



export default router;
