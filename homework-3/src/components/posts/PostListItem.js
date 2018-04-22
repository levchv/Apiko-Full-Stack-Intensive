import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PostListItem = ({title}) => (
    <li>{title}</li>
);

/*class PostListItem extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.title !== this.props.title;
    }

    render() {
        return (
            <li>{this.props.title}</li>
        )
    }
}*/


PostListItem.propTypes = {
    title: PropTypes.string.isRequired
}

export default PostListItem; 