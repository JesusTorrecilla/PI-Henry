import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import * as actions from "../../redux/actions/index";

function SearchBar(props) {
  let [inputSB, setInputSB] = useState("");

  let [select1, setSelect1] = useState("none");

  let dispatch = useDispatch();

  const handleInputChange = function (e) {
    setInputSB(e.target.value);
  };

  const handleSelect = function (e) {
    e.preventDefault();
    setSelect1(e.target.value);
    dispatch(actions.filterByType1(select1));
  };

  return (
    <div id="sbContainer">
      <input
        id="searchBar"
        type="text"
        placeholder="Search..."
        value={inputSB}
        onChange={handleInputChange}
      ></input>
      <button
        id="searchButton"
        onClick={() => {
          dispatch(actions.cleanMsg());
          dispatch(actions.getPokemonByName(inputSB.toLowerCase()));
        }}
      >
        Search
      </button>
      <select
        className="filters"
        name="type1"
        value={select1}
        onChange={handleSelect}
      >
        <option value="none">Filter by Type1</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="shadow">Shadow</option>
      </select>
    </div>
  );
}

export default SearchBar;
