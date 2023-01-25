import React, {useEffect, useRef, useState} from "react";
import "../styles/app.css";
import { PostList } from "../components/PostList";
import { PostForm } from "../components/PostForm";
import { PostFilter } from "../components/PostFilter";
import { MyModal } from "../components/UI/modal/MyModal";
import { MyButton } from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { Loader } from "../components/UI/Loader/Loader";
import { useFatching } from "../hooks/useFatching";
import { getPageCount } from "../utils/pages";
import { Pagination } from "../components/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const lastElement = useRef();
  const observer = useRef();
  
  const [fetchPosts, isPostsLoading, postError] = useFatching ( async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    let callback = function(entries, observer) {
      console.log('hellow');
    };
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(lastElement.current)
  }, [])
  
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Create post
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margin: '15px 0'}} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
      {postError &&
        <h1>Error! ${postError}</h1>
      }
      <PostList 
        remove = {removePost} 
        posts = { sortedAndSearchedPosts } 
        title = 'Posts of JS' 
      />
      <div ref={lastElement} style={{height: 20, background: 'red'}}/>
      {isPostsLoading &&
        <div style ={{display: "flex", justifyContent: "center", marginTop: '50px'}}>
          <Loader />
        </div>
      }
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
      />
    </div>
  )
}

export default Posts;
