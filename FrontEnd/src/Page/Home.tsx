import { Link } from "react-router-dom";
import MovieList from "../Components/MovieList";
import { useAuth } from "../auth/authContext";

interface Movie {
  _id: string;
  title: string;
  year: string;
  rating: string;
}

interface HomeProps {
  movies: Movie[];
  deleteMovie: (id: string) => void;
}

export default function Home({ movies, deleteMovie }: HomeProps) {
  const { logout } = useAuth();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Movie Manager</h1>
      <Link to="/movies" className="text-blue-500 hover:underline">
        Manage Movies
      </Link>

      <MovieList movies={movies} deleteMovie={deleteMovie} />

      <button onClick={logout} className="bg-red-500 text-white p-2 mt-2">
        Logout
      </button>
    </div>
  );
}
