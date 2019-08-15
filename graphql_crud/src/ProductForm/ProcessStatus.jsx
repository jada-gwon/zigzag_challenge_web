import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledProcessStatus = styled.p`
  margin: 10px 0;
  font-weight: bold;
`;

const ProcessStatus = ({ loading, error, called }) => {
  if (error) {
    return (
      <StyledProcessStatus>
      변경 사항을 처리하던 도중 문제가 발생하였습니다. 잠시 후 다시 시도 해 주세요.
      </StyledProcessStatus>
    );
  }
  if (loading) {
    return (
      <StyledProcessStatus>
        <span role="img" aria-label="Sandglass">⏳</span>
        처리 중...
      </StyledProcessStatus>
    );
  }
  if (called) {
    return (
      <StyledProcessStatus>
        <span role="img" aria-label="Green Chek">✅</span>
        완료
      </StyledProcessStatus>
    );
  }
  return null;
};

ProcessStatus.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  called: PropTypes.bool,
};

ProcessStatus.defaultProps = {
  loading: false,
  error: false,
  called: false,
};

export default ProcessStatus;
