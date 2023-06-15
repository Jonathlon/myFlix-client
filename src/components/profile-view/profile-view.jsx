import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("https://jonathlonmovieapp.herokuapp.com/users/:Username", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      const userFromApi = data.map((user) => {
        return {
          UserName: user.UserName,
          Password: user.Passwordrd,
          email: user.email,
          Birthday: user.Birthday,
          FavoriteMovies: {
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
            },
           };
              
      });
  }, []);

  return (
    <>
    
    <Col>
    <Card>
        <Card.Body>
            <Card.Title>User Information</Card.Title>
        </Card.Body>
    </Card>
    </Col>

    <Col>
    <Card>
        <Card.Body>
            <Card.Title>Update Information</Card.Title>
        </Card.Body>
    </Card>
    </Col>

    <Col>
    <Card>
        <Card.Body>
            <Card.Title>Favotie Movies</Card.Title>
        </Card.Body>
    </Card>
    </Col>
    
    </>
  );
  };
  