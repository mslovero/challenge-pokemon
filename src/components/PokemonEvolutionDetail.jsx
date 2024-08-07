import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemonEvolution } from "../hook/usePokemonEvolution";
import { GoHomeIcon } from "./GoHomeIcon";
import { PokemonCard } from "../components/PokemonCard";
import { capitalizeFirstLetter } from "../utils";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const PokemonDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const PokemonName = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const EvolutionList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  padding: 20px 0;
`;

const collectEvolutions = (chain, evolutions = []) => {
  if (chain) {
    evolutions.push(chain);
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolve) =>
        collectEvolutions(evolve, evolutions)
      );
    }
  }
  return evolutions;
};

export const PokemonEvolutionDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { evolutionChain, isLoading } = usePokemonEvolution(name);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!evolutionChain || !evolutionChain.chain) {
    return (
      <>
        <ButtonContainer>
          <GoHomeIcon />
        </ButtonContainer>
        <PokemonName>No evolutions where found.</PokemonName>
      </>
    );
  }

  const allEvolutions = evolutionChain.chain
    ? collectEvolutions(evolutionChain.chain)
    : [];

  return (
    <>
      <ButtonContainer>
        <GoHomeIcon />
      </ButtonContainer>
      <PokemonDetailContainer>
        <PokemonName>Evoluciones de {capitalizeFirstLetter(name)}</PokemonName>
        <EvolutionList>
          {allEvolutions.length > 0 ? (
            allEvolutions.map((evolve) => (
              <PokemonCard
                key={evolve.species.name}
                pokemon={{
                  name: evolve.species.name,
                  url: evolve.species.url,
                }}
              />
            ))
          ) : (
            <PokemonName>No evolutions where found.</PokemonName>
          )}
        </EvolutionList>
      </PokemonDetailContainer>
    </>
  );
};
