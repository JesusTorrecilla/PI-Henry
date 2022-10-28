import React from "react";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import PokeDisplayer from "../PokeDisplayer/PokeDisplayer";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

function Home(props) {
  let msg = useSelector((state) => state.msg);
  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.cleanMsg());
  }, []);

  return (
    <div>
      <Nav></Nav>
      <SearchBar />
      <PokeDisplayer></PokeDisplayer>
    </div>
  );
}

export default Home;
