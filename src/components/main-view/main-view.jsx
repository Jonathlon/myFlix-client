import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      image:
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91ebheNmoUL._RI_.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "Jurassic Park",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
      director: "Steven Spielberg"
    },
    {
      id: 3,
      title: "The Departed",
      image:
        "https://www.comingsoon.net/wp-content/uploads/sites/3/2021/10/Departed-e1633146591556.jpg?w=640",
      director: "Martin Scorsese"
    },
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
