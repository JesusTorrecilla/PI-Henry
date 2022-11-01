import axios from "axios";

export const GET_ALL_POKEMON = "GET_ALL_POKEMON";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const CLEAN_MSG = "CLEAN_MSG";
export const CLEAR_POKEMON = "CLEAR_POKEMON";
export const CHANGE_MSG = "CHANGE_MSG";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER1 = "FILTER1";
export const FILTER2 = "FILTER2";
export const FILTER_BY_PROCEDENCE = "FILTER_BY_PROCEDENCE";
export const SORT_BY_ATTACK = "SORT_BY_ATTACK";
export const SORT_BY_NAME = "SORT_BY_NAME";

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
    if (name === "") {
      const pokemon = await axios.get("http://localhost:3001/pokemons");
      return dispatch({ type: GET_ALL_POKEMON, payload: pokemon.data });
    }

    try {
      const pokemon = await axios.get(
        `http://localhost:3001/pokemons/?name=${name}`
      );
      return dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemon.data });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({ type: CLEAR_POKEMON, payload: error.response.data });
    }
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
    try {
      const pokemon = await axios.post("http://localhost:3001/pokemons", poke);
      return dispatch({ type: CREATE_POKEMON, payload: pokemon.data });
    } catch (error) {
      return dispatch({ type: CHANGE_MSG, payload: error.response.data });
    }
  };
};

export const cleanMsg = () => ({ type: CLEAN_MSG });

export const cleanDetail = () => ({ type: CLEAN_DETAIL });

export const filterByType1 = (type1, type2, proc) => ({
  type: FILTER1,
  payload: [type1, type2, proc],
});

export const sortByAttack = (sa) => ({
  type: SORT_BY_ATTACK,
  payload: sa,
});

export const sortByName = (sn) => ({
  type: SORT_BY_NAME,
  payload: sn,
});
