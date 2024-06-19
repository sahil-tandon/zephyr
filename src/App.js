import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Wordle from "./components/Wordle";

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

        <Routes>
          <Route path="/wordle" element={<Wordle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
