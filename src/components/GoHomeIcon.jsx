import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #007bff;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export const GoHomeIcon = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <HomeIconButton onClick={handleClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </HomeIconButton>
  );
};
