import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { PokemonList } from "./components/PokemonList";
import { PokemonDetail } from "./components/PokemonDetail";
import { PokemonEvolutionDetail } from "./components/PokemonEvolutionDetail";

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  color: #222;
  text-align: center;
  margin: 20px 0;
  padding: 10px 20px;
  background: linear-gradient(120deg, #f5f5f5, #e0e0e0);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  letter-spacing: 1px;
`;

const App = () => {
  return (
    <Router>
      <TitleWrapper />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route
          path="/pokemon-evolution/:name"
          element={<PokemonEvolutionDetail />}
        />
      </Routes>
    </Router>
  );
};

const TitleWrapper = () => {
  const location = useLocation();
  const showTitle = location.pathname === "/";
  return showTitle ? <Title>Pokédex</Title> : null;
};

export default App;
