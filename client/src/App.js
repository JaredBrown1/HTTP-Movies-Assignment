import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";

const App = props => {
  const [savedList, setSavedList] = useState([]);
  const [movie, setMovie] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const movieUpdate = (id, item) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(response => {
        const updatedItem = response.data;
        const newItems = movie.map(item => {
          if (item.id !== updatedItem.id) {
            return item;
          }
          return updatedItem;
        });
        setMovie(newItems);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateMovie {...props} items={movie} updatedItem={movieUpdate} />
        )}
      />
    </>
  );
};

export default App;
