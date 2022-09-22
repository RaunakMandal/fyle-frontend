import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const HomeComponent = () => {
  const [inputName, setInputName] = useState("");
  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };
  return (
    <div className="container">
      <div className="search-container">
        <h4>Enter a GitHub username</h4>
        <input
          type="text"
          placeholder="Enter a username"
          onChange={(e) => handleNameChange(e)}
        />
        <Link to={`/${inputName}`}>
          <button className="search__btn">Search</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;
