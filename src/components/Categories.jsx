import React from "react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export const Categories = ({ handleSearch }) => {
  const history = useHistory();

  const handleCategory = (searchTerm) => {
    handleSearch(searchTerm);
    history.push("/products");
  };

  return (
    <>
      <h2>shop by pet</h2>
      <div id="categories">
        <div className="category-card" onClick={() => handleCategory("dog")}>
          <img src="/assets/dog.jpg" alt="dog" />
          <p>dog</p>
        </div>
        <div className="category-card" onClick={() => handleCategory("cat")}>
          <img src="/assets/cat.jpg" alt="cat" />
          <p>cat</p>
        </div>
        <div className="category-card" onClick={() => handleCategory("bird")}>
          <img src="/assets/bird.jpg" alt="bird" />
          <p>bird</p>
        </div>
        <div
          className="category-card"
          onClick={() => handleCategory("reptile")}
        >
          <img src="/assets/reptile.jpg" alt="reptile" />
          <p>reptile</p>
        </div>
        <div className="category-card" onClick={() => handleCategory("fish")}>
          <img src="/assets/fish.jpg" alt="fish" />
          <p>fish</p>
        </div>
        <div
          className="category-card"
          onClick={() => handleCategory("small animal")}
        >
          <img src="/assets/small-animal.jpg" alt="small animals" />
          <p>small animal</p>
        </div>
      </div>
    </>
  );
};
