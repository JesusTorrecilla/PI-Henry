import {
  GET_ALL_POKEMON,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  GET_TYPES,
  CLEAN_MSG,
  CLEAR_POKEMON,
  CHANGE_MSG,
  CLEAN_DETAIL,
  FILTER1,
} from "../actions/index.js";

const initialState = {
  pokemon: [],
  pokemonDetail: {},
  types: [],
  msg: "",
  errorMsg: "",
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
        errorMsg: "",
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
        pokemon: [action.payload],
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
        errorMsg: "",
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        pokemonDetail: {},
      };
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemon: [],
        errorMsg: action.payload,
      };
    case CHANGE_MSG:
      return {
        ...state,
        msg: action.payload,
      };
    case FILTER1:
      const defaultPoke = state.pokemon;
      const filtered =
        action.payload === "none"
          ? defaultPoke
          : defaultPoke.filter((pokemon) => {
              if (pokemon.tipos.find((a) => a === action.payload)) {
                return pokemon;
              }
            });
      console.log(filtered);
      return {
        ...state,
        pokemon: filtered,
      };
    default:
      return state;
  }
};

export default rootReducer;
