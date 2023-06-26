import { useParams } from "react-router";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

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
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "whitesmoke",
        }}
      >
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>Directed by: {movieData.Director.Name}</Card.Text>
        <Card.Text>Director Bio: {movieData.Director.Bio}</Card.Text>
        <Card.Text>Genre: {movieData.Genre.Name}</Card.Text>
        <Card.Text>Movie Description: {movieData.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`}></Link>

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
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};
