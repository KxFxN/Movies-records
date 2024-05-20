import { Request, Response } from "express";
import Movie from "../models/Movie";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ message: message });
  }
};

export const getMoviesById = async (req: Request , res: Response) => {
  const {id} = req.params;

  try{
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  }catch (error) {
    const message = (error as Error).message;
    res.status(400).json({ message });
  }
}

export const createMovie = async (req: Request, res: Response) => {
  const { title, year, rating } = req.body;
  const newMovie = new Movie({ title, year, rating });

  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).json({ message: message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, year, rating } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(
      id,
      { title, year, rating },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).json({ message: message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ message: message });
  }
};
