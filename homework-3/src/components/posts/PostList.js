import React, {Component} from 'react';
import PostListItem from './PostListItem';
import AddMoreButton from '../buttons/AddMoreButton';

class PostList extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
            totalPostsCount: 0
        };
    }

    getPosts(index, action) {
        fetch('/posts.json')
            .then(result => result.json())
            .then(result => { this.setState({ totalPostsCount: result.length }); return result; })
            .then(result => result.slice(index*10, (index+1)*10))
            .then(result => action(result));
    }

    componentDidMount() {
        this.getPosts(0, (posts) => this.setState({ posts: posts}));
    }

    render() {
        return (
            <React.Fragment>
                <h2>Posts:</h2>
                <ul>
                    {this.state.posts.map(post => (<PostListItem key={post.id} title={post.title}></PostListItem>))}                    
                </ul>
                {this.state.totalPostsCount > this.state.posts.length && <AddMoreButton onClick={() => this.getPosts(this.state.posts.length/10, (posts) => this.setState({ posts: this.state.posts.concat(posts)}))}></AddMoreButton>}
            </React.Fragment>
        );
    }
}

export default PostList;