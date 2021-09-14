import React from "react";

import { useHistory } from "react-router-dom";

export const Categories = ({ handleSearch }) => {
  const history = useHistory();

  const handleCategory = (searchTerm) => {
    handleSearch(searchTerm);
    history.push("/products");
  };

  return (
    <div className="categories">
      <div className="category-card" onClick={() => handleCategory("dog")}>
        <img src="/assets/dog.jpg" alt="dog" />
        <h2>Dog</h2>
      </div>
      <div className="category-card" onClick={() => handleCategory("cat")}>
        <img src="/assets/cat.jpg" alt="cat" />
        <h2>Cat</h2>
      </div>
      <div className="category-card" onClick={() => handleCategory("bird")}>
        <img src="/assets/bird.jpg" alt="bird" />
        <h2>Bird</h2>
      </div>
      <div className="category-card" onClick={() => handleCategory("reptile")}>
        <img src="/assets/reptile.jpg" alt="reptile" />
        <h2>Reptile</h2>
      </div>
      <div className="category-card" onClick={() => handleCategory("fish")}>
        <img src="/assets/fish.jpg" alt="fish" />
        <h2>Fish</h2>
      </div>
      <div
        className="category-card"
        onClick={() => handleCategory("small animal")}
      >
        <img src="/assets/small-animal.jpg" alt="small animals" />
        <h2>Small Animal</h2>
      </div>
    </div>
  );
};
