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
    const selectedItem = props.items.find(item => {
      return item.id === Number(props.match.params.id);
    });

    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [props.items, props.match.params]);

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
      <form>
        <h1>Update Movie Here</h1>
        <label onSubmit={handleSubmit}>
          Title:
          <input
            type="text"
            placeholder="Updated Title"
            onChange={handleChange}
            value={item.title}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            placeholder="Updated Director"
            onChange={handleChange}
            value={item.director}
          />
        </label>
        <label>
          Metascore:
          <input
            type="text"
            placeholder="Updated Metascore"
            onChange={handleChange}
            value={item.price}
          />
        </label>
        <label>
          Stars:
          <input
            type="text"
            placeholder="Updated Stars"
            value={item.stars}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
