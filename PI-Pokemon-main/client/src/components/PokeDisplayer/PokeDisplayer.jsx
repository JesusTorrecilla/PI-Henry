import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index.js";
import PokeCard from "../PokeCard/PokeCard";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./PokeDisplayer.css";

function PokeDisplayer(props) {
  let dispatch = useDispatch();
  let pokemon = useSelector((state) => state.pokemon);
  let types = useSelector((state) => state.types);
  let errorMsg = useSelector((state) => state.errorMsg);
  const [value, setValue] = React.useState({ value1: 0, value2: 12 });
  let pageNumbers = [];
  let [currentPage, setCurrentPage] = React.useState(1);
  let indexOfLastCharacter = currentPage * 12;
  let indexOfFirstCharacter = indexOfLastCharacter - 12;
  let currentCharacters = pokemon.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const [order, setOrder] = React.useState("");

  for (let i = 0; i < Math.ceil(pokemon.length / 12); i++) {
    pageNumbers.push(i);
  }

  React.useEffect(() => {
    dispatch(actions.getTypes());
    dispatch(actions.getAllPokemon());
  }, []);

  let pagination = (number) => {
    setCurrentPage(number);
  };

  let handleNext = () => {
    if (currentPage === Math.ceil(pokemon.length / 12)) {
      pagination(1);
    } else {
      pagination(currentPage + 1);
    }
  };

  let handlePrev = () => {
    if (currentPage === 1) {
      pagination(Math.ceil(pokemon.length / 12));
    } else {
      pagination(currentPage - 1);
    }
  };

  return (
    <>
      <SearchBar pagination={pagination} setOrder={setOrder}></SearchBar>
      <div id="pagButtons">
        {pokemon.lenght < 6 ? setCurrentPage(1) : null}
        {pageNumbers.length > 0 &&
          pageNumbers.map((number) => (
            <button
              className={
                currentPage === number + 1 ? "text-success" : "buttonsBot"
              }
              onClick={() => pagination(number + 1)}
              key={number}
            >
              {number + 1}
            </button>
          ))}
      </div>
      <div className="pokeDisp">
        {currentCharacters &&
          currentCharacters.map((pokemon) => {
            return (
              <PokeCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                sprite={pokemon.sprite}
                hp={pokemon.hp}
                attack={pokemon.attack}
                defense={pokemon.defense}
                speed={pokemon.speed}
                height={pokemon.height}
                weight={pokemon.weight}
                type1={
                  pokemon.tipos && pokemon.tipos[0] ? pokemon.tipos[0].name : ""
                }
                type2={
                  pokemon.tipos && pokemon.tipos[1] ? pokemon.tipos[1].name : ""
                }
              ></PokeCard>
            );
          })}
        {errorMsg.length > 0 ? (
          <div id="loadingContainer">
            <p id="loadingText">Pokemon not Found</p>
          </div>
        ) : pokemon.length === 0 ? (
          <div id="loadingContainer">
            <p id="loadingText">Loading...</p>
          </div>
        ) : (
          <div id="buttons">
            <button className="buttonsBot" onClick={handlePrev}>
              Prev
            </button>
            <button className="buttonsBot" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PokeDisplayer;
