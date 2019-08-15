import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

const StyledFormGroup = styled.div`
  margin-top: 20px;
`;

const StyledLabel = styled.div`
  font-weight: bold;
  display: inline-block;
  width: 150px;
  line-height: 24px;
  vertical-align: top;
`;

const StyledErrorMessage = styled.p`
  color: red;
  margin-top: 8px;
`;

const StyledInput = styled.input`
  border: solid 1px #999;
  height: 24px;
  padding: 0 8px;
  border-radius: 2px;
`;

const StyledArea = styled.textarea`
  border: solid 1px #999;
  height: 24px;
  padding: 4px 8px;
  border-radius: 2px;
  resize: none;
  width: 300px;
  height: 100px;
`;

const FormGroup = ({
  type, name, label, render,
}) => (
  <StyledFormGroup>
    <label htmlFor={name}>
      {label && <StyledLabel>{label}</StyledLabel>}
      {typeof render === 'function' ?
        render({ name }) :
        (
          <Field
            name={name}
            render={({ field }) => (type === 'textarea' ?
              <StyledArea {...field} type={type} id={name} /> :
              <StyledInput {...field} type={type} id={name} />
            )}
          />
        )}
    </label>
    <ErrorMessage name={name} component={StyledErrorMessage} />
  </StyledFormGroup>
);

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  render: PropTypes.oneOfType([null, PropTypes.object]),
};

FormGroup.defaultProps = {
  type: 'text',
  label: '',
  render: null,
};

export default FormGroup;
