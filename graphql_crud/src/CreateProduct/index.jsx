import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ProductForm from '../ProductForm';

const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`;

const validate = (values) => {
  const errors = {};
  if (!values.name_ko) {
    errors.name_ko = '필수 입력값 입니다.';
  }

  if (!values.price) {
    errors.price = '필수 입력값 입니다.';
  } else if (values.price < 0) {
    errors.price = '음수는 입력 할 수 없습니다.';
  } else if (values.price > 2147383647) {
    errors.price = '2147383647보다 큰 값은 입력 할 수 없습니다.';
  }

  if (!values.supplierId) {
    errors.supplierId = '필수 입력값 입니다.';
  }
  return errors;
};

const CreateProduct = ({ history }) => {
  const [
    createProduct,
    { loading, error, called },
  ] = useMutation(CREATE_PRODUCT);
  if (called && !loading) {
    window.alert('상품 추가 성공');
    history.push('/');
  }
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">&lt;뒤로</Link>
      <ProductForm
        onSubmit={({
          // eslint-disable-next-line camelcase
          name_ko, price, supplierId,
        }) => {
          createProduct({
            variables: {
              input: {
                name_ko,
                price,
                supplier_id: supplierId,
              },
            },
          });
        }}
        validate={validate}
        loading={loading}
        error={error}
      />
    </div>
  );
};

CreateProduct.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CreateProduct;
