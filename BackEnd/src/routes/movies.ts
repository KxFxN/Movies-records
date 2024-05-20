import { Router } from "express";
import {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
  getMoviesById,
} from "../controllers/movies";
import { login, register } from "../controllers/auth";
import { authenticate, authorize } from "../Middleware/auth";

const router = Router();

router.post("/register", authenticate, register);
router.post("/login", login);

router.get("/movies", getMovies);
router.get("/movies/:id", getMoviesById);
router.post("/movies", createMovie);
router.put(
  "/movies/:id",
  authenticate,
  authorize(["MANAGER", "TEAMLEADER"]),
  updateMovie
);
router.delete("/movies/:id", authenticate, authorize(["MANAGER"]), deleteMovie);

export default router;
