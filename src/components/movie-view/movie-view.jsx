import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movieData = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(
    user.favoriteMovies.includes(movies._id)
  );

  useEffect(() => {
    setIsFavorite(user.favoriteMovies.includes(movies._id));
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      "https://jonathlonmovieapp.herokuapp.com/users/${username}/movies/${movieId}",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      "https://jonathlonmovieapp.herokuapp.com/users/${username}/movies/${movieId}",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <div>
        <img className="w-100" src={movieData.ImagePath} />
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
        {isFavorite ? (
          <Button variant="danger" className="ms-2" onClick={removeFavorite}>
            Remove from favorites
          </Button>
        ) : (
          <Button variant="success" className="ms-2" onClick={addFavorite}>
            Add to favorites
          </Button>
        )}
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
