import React, {useMemo, useState} from "react";
import "./styles/app.css";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { PostFilter } from "./components/PostFilter";

function App() {
  
const [posts, setPosts] = useState([
  {id: 1, title: 'JavaScript', body: 'Description'},
  {id: 2, title: 'JavaScript', body: 'Description'},
  {id: 3, title: 'JavaScript', body: 'Description'},
  {id: 4, title: 'JavaScript', body: 'Description'}
]);

const [filter, setFilter] = useState({sort: '', query: ''})

const sortedPosts = useMemo( () => {
  if(filter.sort) {
    return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  }
  return posts;
}, [filter.sort, posts]);

const createPost = (newPost) => {
  setPosts([...posts, newPost])
}

const sortedAndSearchedPosts = useMemo(() => {
  return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query.toLowerCase()))
}, [filter.query, sortedPosts])

const removePost = (post) => {
  setPosts(posts.filter(p => p.id !== post.id))
}

return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '15px 0'}} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
      {sortedAndSearchedPosts.length !== 0
        ? 
        <PostList remove = {removePost} posts = { sortedAndSearchedPosts } title = 'Posts of JS' />
        : 
        <h1 style={{textAlign: 'center'}}>No post!</h1>
      }
    </div>
  );
}

export default App;
