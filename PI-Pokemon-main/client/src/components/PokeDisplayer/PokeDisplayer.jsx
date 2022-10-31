import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index.js";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeDisplayer.css";

function PokeDisplayer(props) {
  let dispatch = useDispatch();
  let pokemon = useSelector((state) => state.pokemon);
  let errorMsg = useSelector((state) => state.errorMsg);
  const [value, setValue] = React.useState({ value1: 0, value2: 12 });

  React.useEffect(() => {
    dispatch(actions.getTypes());
    dispatch(actions.getAllPokemon());
  }, []);

  let { value1, value2 } = value;

  let handleNext = () => {
    const val1 = value1 >= pokemon.length - 12 ? (value1 = 0) : value1 + 12;
    const val2 = value2 >= pokemon.length ? (value2 = 12) : value2 + 12;
    setValue({ ...value, value1: val1, value2: val2 });
  };

  let handlePrev = () => {
    let val1 = value1 <= 0 ? pokemon.length - 12 : value1 - 12;
    let val2 = value2 <= 12 ? pokemon.length : value2 - 12;
    // Si val1 es igual o menor a 0 lo igual a 0 para que no me deje pantalla en blanco porque si no slice no sabe que cortar
    if (val1 <= 0) val1 = 0;
    setValue({ ...value, value1: val1, value2: val2 });
  };

  return (
    <>
      <div>
        {pokemon &&
          pokemon.slice(value1, value2).map((pokemon) => {
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
                type1={pokemon.tipos[0].name}
                type2={pokemon.tipos ? pokemon.tipos[1].name : ""}
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

//////////////asdjknfaksbfdakhbdHJSABJDFAJSHBDFJHASHDBFAJSBFJHASJHBFSAD
//////ASKDBASJHBDAHJSBDJAHBSDJAS

export default PokeDisplayer;
