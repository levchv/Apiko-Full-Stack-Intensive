import React from 'react';
import PropTypes from 'prop-types';

const AddMoreButton = ({onClick}) => (
    <button onClick={onClick}>Add more </button>
);

AddMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AddMoreButton;