import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movieData = movies.find((m) => m._id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <div>
          <span>Title: </span>
          <span>{movieData.Title}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movieData.Genre.Name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movieData.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movieData.Director.Name}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movieData.Featured}</span>
        </div>
        <Link to={`/`}>
          <button className="'back-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Featured: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
