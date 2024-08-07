import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 25px;
  padding: 5px 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  max-width: 90%;
  width: fit-content;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  flex: 1;
  font-size: 16px;
  border-radius: 4px;
`;

const Icon = styled.div`
  cursor: pointer;
  padding: 5px;
`;

export const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      return;
    }
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar Pokémon"
      />
      <Icon onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </Icon>
    </SearchContainer>
  );
};
