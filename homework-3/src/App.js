import React, { Component } from 'react';
import './App.css';
import PostList from './components/posts/PostList';

class App extends Component {
  render() {
    return (
      <PostList></PostList>
    );
  }
  componentDidMount() {

  }
}

export default App;
