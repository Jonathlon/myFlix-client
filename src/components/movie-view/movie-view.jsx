import { useParams } from "react-router";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movieData = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movieId)
  );
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movieId));
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://jonathlonmovieapp.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
      `https://jonathlonmovieapp.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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

        <Button
          className="'back-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>

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
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};
