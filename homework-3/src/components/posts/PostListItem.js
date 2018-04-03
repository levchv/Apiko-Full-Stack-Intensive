import React from 'react';
import PropTypes from 'prop-types';

const PostListItem = ({title}) => (
    <li>{title}</li>
);

PostListItem.propTypes = {
    title: PropTypes.string.isRequired
}

export default PostListItem;