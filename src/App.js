import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import {Orginals,action,romances,horrors,comedies,documentaries} from './url'
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={Orginals} title="Netflix Orginals"/>
      <RowPost url={action} title="Action Movies" isSmall/>
      <RowPost url={romances} title="Romance Movies" isSmall/>
      <RowPost url={horrors} title="Horror Movies" isSmall/>
      <RowPost url={comedies} title="Comedy Movies" isSmall/>
      <RowPost url={documentaries} title="Documentry" isSmall/>
    </div>
  );
}

export default App;
