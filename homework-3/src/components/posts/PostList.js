import React, {Component} from 'react';
import PostListItem from './PostListItem';
import AddMoreButton from '../buttons/AddMoreButton';
import SearchInput from '../plugins/search';
import Warning from '../plugins/warning';

class PostList extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
            search: '',
            totalPostsCount: 0
        };

        this.searchInputOnChange = this.searchInputOnChange.bind(this);
        this.addMoreButtonOnClick = this.addMoreButtonOnClick.bind(this);
    }

    getPosts(index, action) {
        fetch('/posts.json')
            .then(result => result.json())
            .then(result => this.state.search ? result.filter(i => i.title.includes(this.state.search)): result)
            .then(result => { this.setState({ totalPostsCount: result.length }); return result; })
            .then(result => result.slice(index*10, (index+1)*10))
            .then(result => action(result));
    }
    
    loadInitialPosts() {
        this.getPosts(0, (posts) => this.setState({ posts: posts}));
    }

    searchInputOnChange(event) {
        this.setState({search: event.target.value});
        this.loadInitialPosts();
    }
    addMoreButtonOnClick() {
        this.getPosts(this.state.posts.length/10, (posts) => this.setState({ posts: this.state.posts.concat(posts)}));
    }

    componentDidMount() {
        this.loadInitialPosts();
    }

    render() {
        return (
            <React.Fragment>
                <h2>Posts:</h2>
                <SearchInput 
                    value={this.state.search} 
                    onChange={this.searchInputOnChange}>
                </SearchInput>
                <ul>
                    {this.state.posts.map(post => (<PostListItem key={post.id} title={post.title}></PostListItem>))}                    
                </ul>
                {this.state.totalPostsCount > this.state.posts.length && <AddMoreButton onClick={this.addMoreButtonOnClick}></AddMoreButton>}
                {this.state.totalPostsCount === 0 && <Warning text="No items found"></Warning>}
            </React.Fragment>
        );
    }
}

export default PostList;