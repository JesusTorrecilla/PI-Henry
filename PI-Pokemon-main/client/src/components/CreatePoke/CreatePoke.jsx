import React from "react";
import Nav from "../Nav/Nav";
import "./CreatePoke.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useHistory } from "react-router-dom";

export function validate(input) {
  let errors = {};
  // if (!input.id) {
  //   errors.id = "Id is required";
  // } else if (!/\S+@\S+\.\S+/.test(input.id)) {
  //   errors.id = "Id is invalid";
  // }
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/([A-Z])\w+/.test(input.name)) {
    errors.name =
      "In name, the first letter must be capital and must have more than one letter ";
  }

  if (!input.hp) {
    errors.hp = false;
  } else if (isNaN(Number(input.hp))) {
    errors.hp = "Hp must be a number";
  } else if (input.hp > 1000) {
    errors.hp = "Hp must be less than 1000";
  } else if (input.hp < 1) {
    errors.hp = "Hp must be more than 0";
  }

  if (!input.attack) {
    errors.attack = false;
  } else if (isNaN(Number(input.attack))) {
    errors.attack = "Attack must be a number";
  } else if (input.attack > 50) {
    errors.attack = "Attack must be less than 50";
  } else if (input.attack < 1) {
    errors.attack = "Attack must be more than 0";
  }

  if (!input.defense) {
    errors.defense = false;
  } else if (isNaN(Number(input.defense))) {
    errors.defense = "Defense must be a number";
  } else if (input.defense > 50) {
    errors.defense = "Defense must be less than 50";
  } else if (input.defense < 1) {
    errors.defense = "Defense must be more than 0";
  }

  if (!input.speed) {
    errors.speed = false;
  } else if (isNaN(Number(input.speed))) {
    errors.speed = "Speed must be a number";
  } else if (input.speed > 100) {
    errors.speed = "Speed must be less than 100";
  } else if (input.speed < 1) {
    errors.speed = "speed must be more than 0";
  }

  if (!input.height) {
    errors.height = false;
  } else if (isNaN(Number(input.height))) {
    errors.height = "Height must be a number";
  } else if (input.height > 10) {
    errors.height = "Height must be less than 10";
  } else if (input.height < 1) {
    errors.height = "Height must be more than 0";
  }

  if (!input.weight) {
    errors.weight = false;
  } else if (isNaN(Number(input.weight))) {
    errors.weight = "Weight must be a number";
  } else if (input.weight > 1000) {
    errors.weight = "Weight must be less than 1000";
  } else if (input.weight < 1) {
    errors.weight = "Weight must be more than 0";
  }

  if (Number(input.typesId1) === Number(input.typesId2)) {
    errors.type = "The types must be different";
  }
  return errors;
}

function CreatePoke(props) {
  let dispatch = useDispatch();

  let history = useHistory();

  let msg = useSelector((state) => state.msg);

  const [input, setInput] = React.useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    typesId1: 1,
    typesId2: 2,
  });

  const [errors, setErrors] = React.useState({});

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function dispatchData(state) {
    dispatch(actions.createPokemon(state));
  }

  function getTypes1() {
    dispatch(actions.getTypes());
  }

  return (
    <>
      <Nav></Nav>
      <div className="bg">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            getTypes1();
            dispatchData(input);
            setTimeout(() => history.push("/home"), 3000);
          }}
        >
          <div id="formContainer">
            <div className="labels">
              <label>Name:</label>
              <br></br>
              <input
                id="inputsName"
                type="text"
                value={input.name}
                name="name"
                onChange={handleInputChange}
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div className="labels">
              <label>HP:</label>
              <br></br>
              <input
                className="inputs"
                type="text"
                value={input.hp}
                name="hp"
                onChange={handleInputChange}
              />
              {errors.hp && <p className="danger">{errors.hp}</p>}
            </div>
            <div className="labels">
              <label>Attack:</label>
              <br></br>
              <input
                className="inputs"
                type="text"
                value={input.attack}
                name="attack"
                onChange={handleInputChange}
              />
              {errors.attack && <p className="danger">{errors.attack}</p>}
            </div>
            <div className="labels">
              <label>Defense:</label>
              <br></br>
              <input
                className="inputs"
                type="text"
                value={input.defense}
                name="defense"
                onChange={handleInputChange}
              />
              {errors.defense && <p className="danger">{errors.defense}</p>}
            </div>
            <div className="labels">
              <label>Speed:</label>
              <br></br>
              <input
                className="inputs"
                type="text"
                value={input.speed}
                name="speed"
                onChange={handleInputChange}
              />
              {errors.speed && <p className="danger">{errors.speed}</p>}
            </div>
            <div className="labels">
              <label>Height:</label>
              <br></br>
              <input
                className="inputs"
                type="text"
                value={input.height}
                name="height"
                onChange={handleInputChange}
              />
              {errors.height && <p className="danger">{errors.height}</p>}
            </div>
            <div className="labels">
              <label>Weight:</label>
              <br></br>
              <input
                className="inputs"
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleInputChange}
              />
              {errors.weight && <p className="danger">{errors.weight}</p>}
            </div>
            <div className="labels">
              <label>Type 1: </label>
              <select
                className="selects"
                name="typesId1"
                value={input.typesId1}
                onChange={handleInputChange}
              >
                <option value="1">Normal</option>
                <option value="2">Fighting</option>
                <option value="3">Flying</option>
                <option value="4">Poison</option>
                <option value="5">Ground</option>
                <option value="6">Rock</option>
                <option value="7">Bug</option>
                <option value="8">Ghost</option>
                <option value="9">Steel</option>
                <option value="10">Fire</option>
                <option value="11">Water</option>
                <option value="12">Grass</option>
                <option value="13">Electric</option>
                <option value="14">Psychic</option>
                <option value="15">Ice</option>
                <option value="16">Dragon</option>
                <option value="17">Dark</option>
                <option value="18">Fairy</option>
                <option value="10001">Unknown</option>
                <option value="10002">Shadow</option>
              </select>
            </div>
            <div className="labels">
              <label>Type 2: </label>
              <select
                className="selects"
                name="typesId2"
                value={input.typesId2}
                onChange={handleInputChange}
              >
                <option value="0">------------</option>
                <option value="1">Normal</option>
                <option value="2">Fighting</option>
                <option value="3">Flying</option>
                <option value="4">Poison</option>
                <option value="5">Ground</option>
                <option value="6">Rock</option>
                <option value="7">Bug</option>
                <option value="8">Ghost</option>
                <option value="9">Steel</option>
                <option value="10">Fire</option>
                <option value="11">Water</option>
                <option value="12">Grass</option>
                <option value="13">Electric</option>
                <option value="14">Psychic</option>
                <option value="15">Ice</option>
                <option value="16">Dragon</option>
                <option value="17">Dark</option>
                <option value="18">Fairy</option>
                <option value="10001">Unknown</option>
                <option value="10002">Shadow</option>
              </select>
              {errors.type && <p className="dangerSel">{errors.type}</p>}
            </div>
            <div>
              {!input.name ? (
                <input
                  type="submit"
                  id="createButtonD"
                  name="submit"
                  value="Create"
                  disabled
                />
              ) : errors.name ||
                errors.hp ||
                errors.attack ||
                errors.defense ||
                errors.speed ||
                errors.height ||
                errors.weight ||
                errors.type ? (
                <input
                  type="submit"
                  id="createButtonD"
                  name="submit"
                  value="Create"
                  disabled
                />
              ) : (
                <input
                  type="submit"
                  id="createButton"
                  name="submit"
                  value="Create"
                />
              )}
            </div>
            {msg.length ? <h3 id="successMsg">{msg}</h3> : null}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePoke;
