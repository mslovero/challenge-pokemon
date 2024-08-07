import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemons,
  fetchAllPokemons,
  setPage,
  setLimit,
  setFilter,
} from "../slices/pokemonSlice";
import { PokemonCard } from "./PokemonCard";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { CustomPrevArrow, CustomNextArrow } from "./CustomArrows";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;
const ListContainer = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-list {
    overflow: visible;
  }
`;
const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden; /* Prevent horizontal scroll */
  position: relative;

  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 30px;
    height: 30px;
    background-color: #838383;
    border-radius: 50%;
    color: red;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }
`;
const ClearFiltersButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: #c82333;
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
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

export const PokemonList = () => {
  const dispatch = useDispatch();
  const {
    list: pokemonData,
    status,
    page,
    limit,
    filter,
  } = useSelector((state) => state.pokemon);
  const { pokemons = [], total } = pokemonData || {};
  const totalPages = limit > 0 ? Math.ceil((total || 0) / limit) : 0;
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemons({ page, limit, filter }));
  }, [dispatch, page, limit, filter]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const applyFilter = async () => {
      const allPokemons = await fetchAllPokemons();
      const filtered = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredPokemons(filtered);
    };

    if (filter) {
      applyFilter();
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [filter, pokemons]);

  const handleSearch = (searchTerm) => {
    dispatch(setFilter(searchTerm));
    dispatch(setPage(1));
    setIsSearching(true);
  };
  const handleResetFilters = () => {
    dispatch(setFilter(""));
    dispatch(setPage(1));
    setIsSearching(false);
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <SearchInput onSearch={handleSearch} />
      <ListContainer>
        {isSearching ? (
          <SliderWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <ClearFiltersButton onClick={handleResetFilters}>
                Borrar Filtros
              </ClearFiltersButton>
            </div>
            <Slider {...settings}>
              {filteredPokemons.length > 0 ? (
                filteredPokemons.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                  </div>
                ))
              ) : (
                <PokemonName>No Pokémon found</PokemonName>
              )}
            </Slider>
          </SliderWrapper>
        ) : (
          <>
            <SliderWrapper>
              <Slider {...settings}>
                {pokemons.map((pokemon, index) => (
                  <div key={index}>
                    <PokemonCard pokemon={pokemon} />
                  </div>
                ))}
              </Slider>
            </SliderWrapper>
          </>
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ListContainer>
    </div>
  );
};
