import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ProductItem from './ProductItem';


const QUERY_PRODUCT_LIST = gql`
  query productList {
    product_list {
      item_list {
        id,
        name_ko,
        name_en,
        price,
        supplier {
          name
        }
      }
    }
  }
`;

const THead = styled.thead`
  font-weight: bold;
  border-top: solid 1px #999;
  border-bottom: solid 1px #999;
  text-align: center;
  td {
    padding: 10px;
  }
`;


const ProductList = () => {
  const { loading, data } = useQuery(QUERY_PRODUCT_LIST);
  if (loading) {
    return <p>Loading ...</p>;
  }

  const { product_list: { item_list: itemList } } = data;
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/create">+ 상품 추가&gt;&gt;</Link>
      <table style={{ width: '100%', marginTop: '20px' }}>
        <THead>
          <tr>
            <td># ID</td>
            <td>한국어 상품명</td>
            <td>영어 상품명</td>
            <td>가격</td>
            <td>공급사</td>
          </tr>
        </THead>
        <tbody>
          {itemList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
