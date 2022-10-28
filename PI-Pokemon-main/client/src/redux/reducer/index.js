import {
  GET_ALL_POKEMON,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  GET_TYPES,
  CLEAN_MSG,
} from "../actions/index.js";

const initialState = {
  pokemon: [],
  pokemonDetail: {},
  types: [],
  msg: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_ALL_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        msg: action.payload,
      };
    case CLEAN_MSG:
      return {
        ...state,
        msg: "",
      };
    default:
      return state;
  }
};

export default rootReducer;
