import { Link } from "react-router-dom";

interface MovieData {
  _id: string;
  title: string;
  year: string;
  rating: string;
}

interface MovieListProps {
  movies: MovieData[];
  deleteMovie: (id: string) => void;
}

function MovieList({ movies, deleteMovie }: MovieListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} className="mb-2 p-2 border">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{movie.title}</h3>
                <p>{movie.year}</p>
                <p>{movie.rating}</p>
              </div>
              <Link
                to={`/movies/${movie._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteMovie(movie._id)}
                className="bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
