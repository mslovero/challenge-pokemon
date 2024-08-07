import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
`;

export const Pagination = ({ page, totalPages, onPageChange }) => {
  const pagesToShow = 3;
  const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const adjustedStartPage = Math.max(1, endPage - pagesToShow + 1);

  return (
    <PaginationContainer>
      {page > 1 && (
        <PageButton onClick={() => onPageChange(page - 1)}>Previous</PageButton>
      )}
      {Array.from(
        { length: endPage - adjustedStartPage + 1 },
        (_, index) => index + adjustedStartPage
      ).map((pageNumber) => (
        <PageButton
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === page}
          style={{
            backgroundColor: pageNumber === page ? "#0056b3" : "#007bff",
          }}
        >
          {pageNumber}
        </PageButton>
      ))}
      {page < totalPages && (
        <PageButton onClick={() => onPageChange(page + 1)}>Next</PageButton>
      )}
    </PaginationContainer>
  );
};
