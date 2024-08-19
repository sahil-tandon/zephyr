import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Wordle from "./components/Wordle";
import StarryBackground from "./components/StarryBackground";

function App() {
  return (
    <Router>
      <StarryBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
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
