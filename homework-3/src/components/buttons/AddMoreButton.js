import React from 'react';
import PropTypes from 'prop-types';
import SimpleButton from './SimpleButton';

const AddMoreButton = ({onClick}) => (
    <SimpleButton onClick={onClick}>Add more </SimpleButton>
);

AddMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AddMoreButton;