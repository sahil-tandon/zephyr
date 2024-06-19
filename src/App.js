import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Wordle from "./Wordle";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/wordle">Wordle</Link>
            </li>
          </ul>
        </nav>

        <Route path="/wordle" component={Wordle} />
      </div>
    </Router>
  );
}

export default App;
