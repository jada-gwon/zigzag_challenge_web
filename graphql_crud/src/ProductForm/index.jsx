import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import FormGroup from './FromGroup';
import SelectSupplier from './SelectSupplier';
import ProcessStatus from './ProcessStatus';

const ProductForm = ({
  product: { supplier, ...product },
  onSubmit,
  onClickDelete,
  validate,
  loading,
  error,
  called,
}) => {
  const initialValues = {
    ...product,
    supplierId: supplier.id || '',
    supplierName: supplier.name,
  };
  const initialError = validate(initialValues);
  return (
    <Formik
      isInitialValid={Object.keys(initialError).length === 0}
      initialValues={initialValues}
      validate={validate}
    >
      {({
        isSubmitting,
        values,
        isValid,
      }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault(e);
            onSubmit(values);
          }}
        >
          <FormGroup name="name_ko" label="한국어 상품명" />
          {values.id && <FormGroup name="name_en" label="영어 상품명" />}
          {values.id && (
            <FormGroup
              name="description_ko"
              label="한국어 상품요약설명"
              type="textarea"
            />
          )}
          {values.id && (
            <FormGroup
              name="description_en"
              label="영어 상품요약설명"
              type="textarea"
            />
          )}
          <FormGroup name="price" label="가격" type="number" />
          <FormGroup
            name="supplierId"
            label="공급사"
            render={({ name }) => (
              values.id ? <span>{values.supplierName}</span> : <SelectSupplier name={name} />
            )}
          />
          <ProcessStatus loading={loading} error={error} called={called} />
          <button type="submit" disabled={isSubmitting || !isValid}>
            {values.id ? '수정' : '추가'}
          </button>
          {values.id && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClickDelete(values.id);
            }}
          >
            삭제
          </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name_ko: PropTypes.string,
    name_en: PropTypes.string,
    description_ko: PropTypes.string,
    description_en: PropTypes.string,
    price: PropTypes.number,
    supplier: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
  onSubmit: PropTypes.func,
  onClickDelete: PropTypes.func,
  validate: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  called: PropTypes.bool,
};

ProductForm.defaultProps = {
  product: {
    supplier: {},
  },
  onSubmit: () => undefined,
  onClickDelete: () => undefined,
  validate: () => ({}),
  loading: false,
  error: false,
  called: false,
};

export default ProductForm;
