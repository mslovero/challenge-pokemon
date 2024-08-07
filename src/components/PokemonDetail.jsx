import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  capitalizeFirstLetter,
  getRandomColor,
  typeTranslations,
} from "../utils";
import { GoHomeIcon } from "./GoHomeIcon";

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
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 40px;
  }
`;

const ImageContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    height: 400px;
    margin-right: 40px;
  }
`;

const PokemonImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 12px;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
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

const PokemonTypes = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const TypeBadge = styled.span`
  background-color: ${({ type }) => getRandomColor()};
  color: #333;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const PokemonInfo = styled.div`
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: #555;
`;

const StatsContainer = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const StatsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 12px;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
`;

const StatName = styled.span`
  font-weight: bold;
`;

const StatValue = styled.span``;
const EvolutionButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(response.data);
    };

    fetchPokemonDetail();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }
  const handleEvolutionClick = () => {
    navigate(`/pokemon-evolution/${name}`);
  };
  return (
    <>
      <ButtonContainer>
        <GoHomeIcon />
      </ButtonContainer>
      <PokemonDetailContainer>
        <ImageContainer>
          <PokemonImage
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        </ImageContainer>
        <InfoContainer>
          <PokemonName>{capitalizeFirstLetter(pokemon.name)}</PokemonName>
          <PokemonTypes>
            {pokemon.types.map((type) => (
              <TypeBadge key={type.type.name}>
                {typeTranslations(type.type.name)}
              </TypeBadge>
            ))}
          </PokemonTypes>
          <PokemonInfo>Peso: {pokemon.weight / 10} kg</PokemonInfo>
          <PokemonInfo>Altura: {pokemon.height / 10} m</PokemonInfo>
          <PokemonInfo>
            Habilidades:
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </PokemonInfo>
          <StatsContainer>
            <StatsTitle>Estadísticas:</StatsTitle>
            <StatsList>
              {pokemon.stats.map((stat) => (
                <Stat key={stat.stat.name}>
                  <StatName>{stat.stat.name.replace("-", " ")}:</StatName>
                  <StatValue>{stat.base_stat}</StatValue>
                </Stat>
              ))}
            </StatsList>
          </StatsContainer>
          <EvolutionButton onClick={handleEvolutionClick}>
            Ver Evoluciones
          </EvolutionButton>
        </InfoContainer>
      </PokemonDetailContainer>
    </>
  );
};
