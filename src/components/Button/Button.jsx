import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => (
  <button type="submit" className="button" onClick = {onClick}>
    {/* {children} */}
    <span className="button-label">{children}</span>
  </button>
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