import React from 'react';
import PropTypes from 'prop-types';

const Warning = ({text}) => (
    <div>{text}</div>
);

Warning.propTypes = {
    text: PropTypes.string.isRequired
}

export default Warning;