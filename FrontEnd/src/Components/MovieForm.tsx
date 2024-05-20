import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieFormProps {
  addMovie: (movie: Omit<Movie, "_id">) => void;
  updateMovie: (movie: Omit<Movie, "_id">, id: string) => void;
}

interface Movie {
  _id: string;
  title: string;
  year: string;
  rating: string;
}

function MovieForm({ addMovie, updateMovie }: MovieFormProps) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    id &&
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setYear(response.data.year);
          setRating(response.data.rating);
        })
        .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: Movie = { _id: Date.now().toString(), title, year, rating };
    id ? updateMovie({ title, year, rating }, id) : addMovie(newMovie);
    setTitle("");
    setYear("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Year Released</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Rating</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="M">M</option>
          <option value="MA">MA</option>
          <option value="R">R</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        {id ? "Save Change" : "Add Movie"}
      </button>
    </form>
  );
}

export default MovieForm;
