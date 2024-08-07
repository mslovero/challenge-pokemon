import React from "react";
import styled from "styled-components";

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  background: ;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: #308446;
  }
`;

export const CustomPrevArrow = (props) => (
  <Arrow className="slick-prev" onClick={props.onClick}>
    <i className="fa fa-chevron-left"></i>
  </Arrow>
);

export const CustomNextArrow = (props) => (
  <Arrow className="slick-next" onClick={props.onClick}>
    <i className="fa fa-chevron-right"></i>
  </Arrow>
);
