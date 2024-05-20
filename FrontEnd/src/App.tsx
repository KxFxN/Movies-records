import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/authContext";
import axios from "axios";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from "./Page/Register";
import MovieManager from "./Page/MovieManager";
import PrivateRoute from "./auth/PrivateRoute";

interface Movie {
  _id: string;
  title: string;
  year: string;
  rating: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, []);

  const addMovie = (movie: Omit<Movie, "_id">) => {
    axios
      .post("http://localhost:5000/api/movies", movie, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMovies([...movies, response.data]))
      .catch((error) => console.error("Error adding movie:", error));
  };

  const updateMovie = (movie: Omit<Movie, "_id">, id: string) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) =>
        setMovies(movies.map((m) => (m._id === id ? response.data : m)))
      )
      .catch((error) => console.error("Error updating movie:", error));
  };

  const deleteMovie = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setMovies(movies.filter((movie) => movie._id !== id)))
      .catch((error) => console.error("Error deleting movie:", error));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/"
              element={<Home movies={movies} deleteMovie={deleteMovie} />}
            />
            <Route
              path="/movies"
              element={
                <MovieManager addMovie={addMovie} updateMovie={updateMovie} />
              }
            />
            <Route
              path="/movies/:id"
              element={
                <MovieManager addMovie={addMovie} updateMovie={updateMovie} />
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
