import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledRow = styled.tr`
  &:nth-child(2n + 1) {
    background: #eee
  }
`;

const StyledColumn = styled.td`
  padding: 10px;
  text-align: center;
`;

const StyledPriceColumn = styled(StyledColumn)`
  text-align: right;
`;

const ProductItem = ({ product }) => (
  <StyledRow key={product.id}>
    <StyledColumn>
      <Link to={`/product/${product.id}`}>{product.id}</Link>
    </StyledColumn>
    <StyledColumn>{product.name_ko}</StyledColumn>
    <StyledColumn>{product.name_en}</StyledColumn>
    <StyledPriceColumn>
      {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      원
    </StyledPriceColumn>
    <StyledColumn>{product.supplier.name}</StyledColumn>
  </StyledRow>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name_ko: PropTypes.string,
    name_en: PropTypes.string,
    price: PropTypes.number,
    supplier: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductItem;
