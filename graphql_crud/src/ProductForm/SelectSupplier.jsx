import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Field } from 'formik';
import gql from 'graphql-tag';
import styled from 'styled-components';

const QUERY_SUPPLIER_LIST = gql`
  query supplierList {
    supplier_list {
      item_list {
        id,
        name
      }
    }
  }
`;

const StyledSelect = styled.select`
  background: transparent;
  border: solid 1px #999;
  height: 24px;
  padding: 0 8px;
  border-radius: 2px;
`;


const SelectSupplier = ({ name }) => {
  const { loading, data } = useQuery(QUERY_SUPPLIER_LIST);
  return (
    <Field
      id={name}
      name={name}
      // component="select"
      render={({ field }) => (
        <StyledSelect {...field}>
          <option disabled value="">선택</option>
          {!loading && data.supplier_list.item_list.map(
            ({ id, name: supplierName }) => (
              <option key={id} value={id}>{supplierName}</option>
            ),
          )}
        </StyledSelect>
      )}
    />
  );
};

SelectSupplier.propTypes = {
  name: PropTypes.string.isRequired,
  // value: PropTypes.string,
};

SelectSupplier.defaultProps = {
  // value: '',
};

export default SelectSupplier;
