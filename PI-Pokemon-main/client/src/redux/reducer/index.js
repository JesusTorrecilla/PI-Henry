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
  FILTER2,
  FILTER_BY_PROCEDENCE,
  SORT_BY_ATTACK,
  SORT_BY_NAME,
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
      let message = "";
      console.log(defaultPoke, action.payload);
      const filtered =
        action.payload === "none"
          ? defaultPoke
          : defaultPoke.filter((pokemon) => {
              if (pokemon.tipos[1]) {
                return (
                  pokemon.tipos[0].name === action.payload ||
                  pokemon.tipos[1].name === action.payload
                );
              } else {
                return pokemon.tipos[0].name === action.payload;
              }
            });
      if (filtered.length < 1) {
        message = "Pokemon not Found";
      }
      console.log(filtered);
      return {
        ...state,
        pokemon: filtered,
        errorMsg: message,
      };
    case FILTER2:
      const defaultPoke2 = state.pokemon;
      let message2 = "";
      console.log(defaultPoke2, action.payload);
      const filtered2 =
        action.payload === "none"
          ? defaultPoke2
          : defaultPoke2.filter((pokemon) => {
              if (pokemon.tipos[1]) {
                return (
                  pokemon.tipos[0].name === action.payload ||
                  pokemon.tipos[1].name === action.payload
                );
              } else {
                return pokemon.tipos[0].name === action.payload;
              }
            });
      console.log(filtered2);
      if (filtered2.length < 1) {
        message2 = "Pokemon not Found";
      }
      return {
        ...state,
        pokemon: filtered2,
        errorMsg: message2,
      };
    case SORT_BY_ATTACK:
      const defaultPoke3 = state.pokemon;
      const sortByAttack =
        action.payload === "none"
          ? defaultPoke3
          : action.payload === "asc1"
          ? defaultPoke3.sort(function (a, b) {
              return b.attack - a.attack;
            })
          : action.payload === "desc2"
          ? defaultPoke3.sort(function (a, b) {
              return a.attack - b.attack;
            })
          : null;
      return {
        ...state,
        pokemon: sortByAttack,
      };
    case SORT_BY_NAME:
      const defaultPoke4 = state.pokemon;
      const sortByName =
        action.payload === "none"
          ? defaultPoke4
          : action.payload === "asc"
          ? defaultPoke4.sort((a, b) => a.name.localeCompare(b.name))
          : action.payload === "desc"
          ? defaultPoke4.sort((a, b) => b.name.localeCompare(a.name))
          : null;
      return {
        ...state,
        pokemon: sortByName,
      };
    case FILTER_BY_PROCEDENCE:
      const defaultPoke5 = state.pokemon;
      const filterByProc =
        action.payload === "all"
          ? defaultPoke5
          : action.payload === "api"
          ? defaultPoke5.filter((poke) => poke.created === "api")
          : action.payload === "database"
          ? defaultPoke5.filter((poke) => poke.created === "db")
          : null;
      return {
        ...state,
        pokemon: filterByProc,
      };
    default:
      return state;
  }
};

export default rootReducer;
