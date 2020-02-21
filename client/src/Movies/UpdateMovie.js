import React, { useState, useEffect } from "react";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [item, setItem] = useState({ initialItem });

  useEffect(() => {
    console.log("use effect test", props.items);
    const selectedItem = props.movie.find(item => {
      return item.id === Number(props.match.params.id);
    });

    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [props.items, props.match.params]);

  const handleChangeStars = (e, i) => {
    let newStars = props.movie.stars;
    newStars[i] = e.target.value;
    setItem({
      ...item,
      stars: newStars
    });
  };

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    setItem({
      ...item,
      [e.target.name]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const id = Number(props.match.params.id);
    props.updateItem(id, item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Movie Here</h1>
        <label>
          Title:{""}
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={item.title}
          />
        </label>

        <label>
          Director:{""}
          <input
            type="text"
            name="director"
            onChange={handleChange}
            value={item.director}
          />
        </label>

        <label>
          Metascore:{""}
          <input
            type="text"
            name="metascore"
            onChange={handleChange}
            value={item.price}
          />
        </label>

        <label>
          Stars:{""}
          <input
            type="text"
            name="stars"
            value={item.stars}
            onChange={handleChangeStars}
          />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
