import express from "express";
import { createMovies, getAllMovies, getSingleMovies } from "../controllers/movieController.js";
import VerifyToken from "../middleware/VerifyToken.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

// Upload files
router.post('/', VerifyToken, authorization('admin'), createMovies)
router.get('/', VerifyToken, authorization('user', 'admin'), getAllMovies)
router.get('/:id', VerifyToken, authorization('user', 'admin'), getSingleMovies)


export default router;
