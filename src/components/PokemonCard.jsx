import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { usePokemonDetails } from "../hook/usePokemonDetails";
import { getRandomColor, typeTranslations } from "../utils";

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  width: 300px;
  text-align: center;
  background: linear-gradient(145deg, #fff, #f9f9f9);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    background: linear-gradient(145deg, #f0f0f0, #ffffff);
  }
`;

const PokemonName = styled.h3`
  font-size: 1.6rem;
  color: #333;
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokemonImage = styled.img`
  width: 90%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Badge = styled.div`
  top: 10px;
  left: 10px;
  background: #ffcb05;
  color: #000;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-width: 10%;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12px;
`;

const TypeBadge = styled.span`
  display: inline-block;
  background-color: ${({ type }) => getRandomColor()};
  color: #333;
  border-radius: 12px;
  padding: 6px 12px;
  margin: 4px;
  font-size: 0.9rem;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ArrowIcon = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 1.5rem;
  color: #007bff;
  margin-top: 12px;
`;

export const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const { details, loading, error } = usePokemonDetails(pokemon.url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon details.</p>;

  const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <Card onClick={handleClick}>
      <PokemonName>{capitalizeFirstLetter(pokemon.name)}</PokemonName>
      <ImageContainer>
        <PokemonImage src={pokemonImageUrl} alt={pokemon.name} />
      </ImageContainer>
      {details && details.types && details.types.length > 0 && (
        <TypesContainer>
          {details.types.map((typeInfo, index) => (
            <TypeBadge key={index} type={typeInfo.type.name}>
              {typeTranslations(typeInfo.type.name)}
            </TypeBadge>
          ))}
        </TypesContainer>
      )}
      <ArrowIcon>
        <FontAwesomeIcon icon={faArrowRight} />
      </ArrowIcon>
      <Badge>#{pokemonId}</Badge>
    </Card>
  );
};
