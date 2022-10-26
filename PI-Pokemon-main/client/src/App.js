import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CreatePoke from "./components/CreatePoke/CreatePoke";

function App() {
  return (
    <>
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/home" component={Home}></Route>
      {/* <Route path="/details/:id" component={c}></Route> */}
      <Route exact path="/create" component={CreatePoke}></Route>
    </>
  );
}

export default App;
