import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ProductForm from '../ProductForm';

const QUERY_PRODUCT = gql`
  query queryProduct($id: ID!) {
    product(id: $id) {
    id,
    name_ko,
    name_en,
    description_ko,
    description_en,
    price,
    supplier{
      id,
      name
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      id
    }
  }
`;

const validate = (values) => {
  const errors = {};
  if (!values.name_ko) {
    errors.name_ko = '필수 입력값 입니다.';
  }

  if (!values.name_en) {
    errors.name_en = '필수 입력값 입니다.';
  }

  if (!values.description_ko) {
    errors.description_ko = '필수 입력값 입니다.';
  }

  if (!values.description_en) {
    errors.description_en = '필수 입력값 입니다.';
  }

  if (!values.price) {
    errors.price = '필수 입력값 입니다.';
  } else if (values.price < 0) {
    errors.price = '음수는 입력 할 수 없습니다.';
  } else if (values.price > 2147483647) {
    errors.price = '2147483647보다 큰 값은 입력 할 수 없습니다.';
  }

  return errors;
};

const ProductDetail = ({ match, history }) => {
  const { params: { productId } } = match;
  const { loading, data } = useQuery(
    QUERY_PRODUCT,
    { variables: { id: productId } },
  );
  const [
    updateProduct,
    { error: errorOnUpdate, loading: loadUpdate, called: updateCalled },
  ] = useMutation(UPDATE_PRODUCT);
  const [
    deleteProduct,
    { error: errorOnDelete, loading: loadDelete, called: deleteCalled },
  ] = useMutation(DELETE_PRODUCT);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if ((deleteCalled && !loadDelete)) {
    window.alert('상품 삭제 성공');
    history.push('/');
  }
  const { product } = data;
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">&lt;뒤로</Link>
      <ProductForm
        product={product}
        onSubmit={({
          // eslint-disable-next-line camelcase
          id, name_ko, name_en, description_ko, description_en, price,
        }) => {
          updateProduct({
            variables: {
              input: {
                id, name_ko, name_en, description_ko, description_en, price,
              },
            },
          });
        }}
        onClickDelete={(id) => {
          deleteProduct({
            variables: { input: { id } },
          });
        }}
        validate={validate}
        loading={loadUpdate || loadDelete}
        error={errorOnUpdate || errorOnDelete}
        called={updateCalled && !loadUpdate}
      />
    </div>
  );
};

ProductDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetail;
