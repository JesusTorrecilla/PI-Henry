import React from "react";
import Nav from "../Nav/Nav";
import "./PokeDetails.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index.js";

function PokeDetails(props) {
  let dispatch = useDispatch();
  let detail = useSelector((state) => state.pokemonDetail);

  React.useEffect(() => {
    dispatch(actions.getPokemonById(props.match.params.id));
  }, []);

  return (
    <div>
      <Nav></Nav>
      <div id="detTitle">
        <h1>Details: {detail.name}</h1>
      </div>
      <div className="containerDetails">
        <div className="imgContainer">
          <img src={detail.sprite} alt={detail.name} id="imgContainer"></img>
          {String(detail.id).length < 5 ? (
            <h2 id="idTag">#{detail.id}</h2>
          ) : (
            <h2 id="idTag">User created</h2>
          )}
        </div>
        <div className="infoContainer">
          <div id="detInfoContainer">
            <h3>Attack: {detail.attack}</h3>
            <h3>Defense: {detail.defense}</h3>
            <h3>Health: {detail.hp}</h3>
            <h3>Speed: {detail.speed}</h3>
            <h3>Height: {detail.height}</h3>
            <h3>Weight: {detail.weight}</h3>
            <h3 id="types">
              Types: {detail.type1} {detail.type2}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeDetails;
