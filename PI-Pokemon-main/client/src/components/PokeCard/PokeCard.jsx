import React from "react";
import "./PokeCard.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions/index.js";

function PokeCard(props) {
  return (
    <div className="pokeCard">
      <Link id="link" to={`/pokemon/details/${props.id}`}>
        <h5 id="pokeName">{props.name}</h5>
        <img className="imgPoke" src={props.sprite} alt={props.name}></img>
        <div className="stats">
          <div className="statsLeft">
            <p>Health: {props.hp}</p>
            <p>Attack: {props.attack}</p>
            <p>Defense: {props.defense}</p>
          </div>
          <div className="statsRight">
            <p>Height: {props.height}</p>
            <p>Weight: {props.weight}</p>
            <p id="typesCap">
              Types: {props.type1} {props.type2}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default PokeCard;
