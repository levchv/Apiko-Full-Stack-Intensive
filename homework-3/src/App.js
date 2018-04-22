import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './App.css';
import PostList from './components/posts/PostList';
import PostListItem from './components/posts/PostListItemEnhancer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/test">Test</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/test" render={() => <PostListItem title="test"></PostListItem>} />
        </Switch>
      </React.Fragment>
    );
  }
  componentDidMount() {

  }
}

export default App;
