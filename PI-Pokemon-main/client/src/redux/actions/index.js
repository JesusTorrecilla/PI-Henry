import axios from "axios";

export const GET_ALL_POKEMON = "GET_ALL_POKEMON";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";

export const getAllPokemon = () => {
  return async function (dispatch) {
    const pokemon = await axios.get("http://localhost:3001/pokemons");
    return dispatch({ type: GET_ALL_POKEMON, payload: pokemon.data });
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    const pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`);
    return dispatch({ type: GET_POKEMON_BY_ID, payload: pokemon.data });
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    const pokemon = await axios.get(
      `http://localhost:3001/pokemons/?name=${name}`
    );
    return dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemon.data });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    const types = await axios.get("http://localhost:3001/types");
    return dispatch({ type: GET_TYPES, payload: types.data });
  };
};

export const createPokemon = (poke) => {
  return async function (dispatch) {
    const pokemon = await axios.post("http://localhost:3001/pokemons", poke);
    return dispatch({ type: CREATE_POKEMON, payload: pokemon.data });
  };
};
