import { useEffect, useState } from "react";
import { useGenre } from "../contexts/genre";
import { api } from "../services/api";
import { MovieCard } from './MovieCard';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  const { selectedGenre } = useGenre();
  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre?.id}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre]);

  return (
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key={movie.Title} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  )
}