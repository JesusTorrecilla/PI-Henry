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
  SORT_BY_ATTACK,
  SORT_BY_NAME,
} from "../actions/index.js";

const initialState = {
  pokemon: [],
  allPokemon: [],
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
        allPokemon: action.payload,
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
      const defaultPoke = state.allPokemon;
      let message = "";
      let pay = action.payload;

      let filt1 = defaultPoke.filter((pokemon) => {
        if (pay[0] === "none") return defaultPoke;
        if (pokemon.tipos[1]) {
          return (
            pokemon.tipos[0].name === pay[0] || pokemon.tipos[1].name === pay[0]
          );
        } else {
          return pokemon.tipos[0].name === pay[0];
        }
      });

      let filt2 = filt1.filter((pokemon) => {
        if (pay[0] === "none" && pay[1] === "none") return defaultPoke;
        if (pay[1] === "none") return filt1;
        if (pokemon.tipos[1]) {
          return (
            pokemon.tipos[0].name === pay[1] || pokemon.tipos[1].name === pay[1]
          );
        } else {
          return pokemon.tipos[0].name === pay[0];
        }
      });

      let filt3 = filt2.filter((pokemon) => {
        if (pay[0] === "none" && pay[1] === "none" && pay[2] === "all")
          return defaultPoke;
        if (pay[2] === "all") return filt2;
        return pokemon.created === pay[2];
      });

      if (filt3.length < 1) {
        message = "Pokemon not Found";
      }
      return {
        ...state,
        pokemon: filt3,
        errorMsg: message,
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
    default:
      return state;
  }
};

export default rootReducer;
