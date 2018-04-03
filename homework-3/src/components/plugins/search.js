import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({value, onChange}) => (
    <div>
        <label>Search:</label><input type="text" value={value} onChange={onChange} />
    </div>
);

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default SearchInput;