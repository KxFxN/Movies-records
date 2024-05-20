import MovieForm from "../Components/MovieForm";

interface Movie {
  _id: string;
  title: string;
  year: string;
  rating: string;
}

interface MovieManagerProps {
  addMovie: (movie: Omit<Movie, '_id'>) => void;
  updateMovie: (movie: Omit<Movie, "_id"> , id:string) => void; 
}

function MovieManager({addMovie,updateMovie}:MovieManagerProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
      <MovieForm addMovie={addMovie} updateMovie={updateMovie}/>
    </div>
  );
}

export default MovieManager;
