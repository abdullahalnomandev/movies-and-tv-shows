import express from "express";
import { createMovies, getAllMovies } from "../controllers/movieController.js";

const router = express.Router();

// Upload files
router.post('/', createMovies)
router.get('/', getAllMovies)


export default router;
