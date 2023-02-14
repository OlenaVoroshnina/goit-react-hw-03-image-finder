import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './LoadMore.styled';

const LoadMore = ({ children, onClick }) => (
  <LoadMoreButton type="button" onClick = {onClick}>
    {children}
  </LoadMoreButton>
);

LoadMore.defaultProps = {
    onClick: () =>null,
    children: null,
};

LoadMore.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
}

export default LoadMore;