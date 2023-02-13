import React from 'react';
import PropTypes from 'prop-types';
import { SearchButton } from './Button.styled';

const Button = ({ children, onClick }) => (
  <SearchButton type="submit" onClick = {onClick}>
    {children}
    {/* <span>{children}</span> */}
  </SearchButton>
);

Button.defaultProps = {
    onClick: () =>null,
    children: null,
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
}

export default Button;