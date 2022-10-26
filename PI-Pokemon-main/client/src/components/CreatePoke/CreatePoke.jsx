import React from "react";
import Nav from "../Nav/Nav";
import "./CreatePoke.css";

export function validate(input) {
  let errors = {};
  if (!input.id) {
    errors.id = "Id is required";
  } else if (!/\S+@\S+\.\S+/.test(input.id)) {
    errors.id = "Id is invalid";
  }
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/([A-Z])\w+/.test(input.name)) {
    errors.name =
      "In name, the first letter must be capital and must have more than one letter ";
  }

  if (!input.hp) {
    errors.hp = false;
  } else if (input.hp > 1000) {
    errors.hp = "Hp must be less than 1000";
  } else if (input.hp < 1) {
    errors.hp = "Hp must be more than 0";
  }

  if (!input.attack) {
    errors.attack = false;
  } else if (input.attack > 50) {
    errors.attack = "Attack must be less than 50";
  } else if (input.attack < 1) {
    errors.attack = "Attack must be more than 0";
  }

  if (!input.defense) {
    errors.defense = false;
  } else if (input.defense > 50) {
    errors.defense = "Defense must be less than 50";
  } else if (input.defense < 1) {
    errors.defense = "Defense must be more than 0";
  }

  if (!input.speed) {
    errors.speed = false;
  } else if (input.speed > 100) {
    errors.speed = "Speed must be less than 100";
  } else if (input.speed < 1) {
    errors.speed = "speed must be more than 0";
  }

  if (!input.height) {
    errors.height = false;
  } else if (input.height > 10) {
    errors.height = "Height must be less than 10";
  } else if (input.height < 1) {
    errors.height = "Height must be more than 0";
  }

  if (!input.weight) {
    errors.weight = false;
  } else if (input.weight > 1000) {
    errors.weight = "Weight must be less than 1000";
  } else if (input.weight < 1) {
    errors.weight = "Weight must be more than 0";
  }

  return errors;
}

function CreatePoke(props) {
  const [input, setInput] = React.useState({
    id: "",
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
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
  return (
    <>
      <Nav></Nav>
      <form className="form">
        <div id="formContainer">
          <div className="labels">
            <label>ID:</label>
            <br></br>
            <input
              className={errors.id && "danger"}
              type="text"
              value={input.id}
              name="id"
              onChange={handleInputChange}
            />
            {errors.id && <p className="danger">{errors.id}</p>}
          </div>
          <div className="labels">
            <label>Name:</label>
            <br></br>
            <input
              className={errors.name && "danger"}
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
              className={errors.hp && "danger"}
              type="text"
              name="hp"
              onChange={handleInputChange}
            />
            {errors.hp && <p className="danger">{errors.hp}</p>}
          </div>
          <div className="labels">
            <label>Attack:</label>
            <br></br>
            <input
              className={errors.attack && "danger"}
              type="text"
              name="attack"
              onChange={handleInputChange}
            />
            {errors.attack && <p className="danger">{errors.attack}</p>}
          </div>
          <div className="labels">
            <label>Defense:</label>
            <br></br>
            <input
              className={errors.defense && "danger"}
              type="text"
              name="defense"
              onChange={handleInputChange}
            />
            {errors.defense && <p className="danger">{errors.defense}</p>}
          </div>
          <div className="labels">
            <label>Speed:</label>
            <br></br>
            <input
              className={errors.speed && "danger"}
              type="text"
              name="speed"
              onChange={handleInputChange}
            />
            {errors.speed && <p className="danger">{errors.speed}</p>}
          </div>
          <div className="labels">
            <label>Height:</label>
            <br></br>
            <input
              className={errors.height && "danger"}
              type="text"
              name="height"
              onChange={handleInputChange}
            />
            {errors.height && <p className="danger">{errors.height}</p>}
          </div>
          <div className="labels">
            <label>Weight:</label>
            <br></br>
            <input
              className={errors.weight && "danger"}
              type="text"
              name="weight"
              onChange={handleInputChange}
            />
            {errors.weight && <p className="danger">{errors.weight}</p>}
          </div>
          <div className="labels">
            <label>Type: </label>
            <select name="type" onChange={handleInputChange}>
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
          <div>
            <input type="submit" name="submit" value="Create" disabled="true" />
          </div>
        </div>
      </form>
    </>
  );
}

export default CreatePoke;
