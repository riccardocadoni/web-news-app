import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useFirebaseAuth from "./hooks/useFirebaseAuth";
import RouterSwitch from "./navigation/RouterSwitch";
import Header from "./components/Header";

function App() {
  useFirebaseAuth();

  return (
    <Router>
      <Header />
      <RouterSwitch />
    </Router>
  );
}

export default App;
