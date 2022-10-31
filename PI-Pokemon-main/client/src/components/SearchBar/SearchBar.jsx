import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import * as actions from "../../redux/actions/index";

function SearchBar(props) {
  let [inputSB, setInputSB] = useState("");

  let [select1, setSelect1] = useState("none");
  let [select2, setSelect2] = useState("none");
  let [attack, setAttack] = useState("none");
  let [name, setName] = useState("none");
  let [procedence, setProcedence] = useState("all");

  let dispatch = useDispatch();

  const handleInputChange = function (e) {
    setInputSB(e.target.value);
  };

  React.useEffect(() => {
    dispatch(actions.filterByType1(select1, select2, procedence));
  }, [select1, select2, procedence]);

  // const handleSelect1 = function (e) {
  //   console.log(e.target.value);
  //   dispatch(actions.filterByType1([select1, select2]));
  // };

  const handleSelect2 = function (e) {
    e.preventDefault();
    dispatch(actions.filterByType2(e.target.value));
  };

  const handleAttack = function (e) {
    e.preventDefault();
    // setAttack(e.target.value);
    dispatch(actions.sortByAttack(e.target.value));
  };

  const handleName = function (e) {
    e.preventDefault();
    dispatch(actions.sortByName(e.target.value));
  };

  const handleProcedence = function (e) {
    e.preventDefault();
    dispatch(actions.filterByProcedence(e.target.value));
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
        onChange={(e) => {
          setSelect1(e.target.value);
          // handleSelect1(e);
        }}
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
      <select
        className="filters"
        name="type2"
        onChange={(e) => {
          setSelect2(e.target.value);
          // handleSelect1();
        }}
      >
        <option value="none">Filter by Type2</option>
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
      <select
        className="filters"
        name="created"
        onChange={(e) => {
          setProcedence(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="api">API</option>
        <option value="db">Database</option>
      </select>
      <select className="filters" name="sortName" onChange={handleName}>
        <option value="none">Sort by Name</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <select className="filters" name="sortAttack" onChange={handleAttack}>
        <option value="none">Sort by Attack</option>
        <option value="asc1">Asc</option>
        <option value="desc2">Desc</option>
      </select>
    </div>
  );
}

export default SearchBar;
