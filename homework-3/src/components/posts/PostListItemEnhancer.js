import { onlyUpdateForKeys } from 'recompose';
import PostListItem from './PostListItem';

const enhancer = onlyUpdateForKeys(['title']);

export default enhancer(PostListItem);