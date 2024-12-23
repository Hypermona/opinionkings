import { useState } from "react";
import { createContainer } from "unstated-next";

function Posts(initialCount = []) {
  let [posts, setPosts] = useState({ data: {}, fetching: true, error: {} });
  let [post, setPost] = useState(undefined);
  function updateOpinions(postId,opinions){
    setPosts((prev)=>{
       const updatedPosts = { ...prev };
       updatedPosts.data.posts = updatedPosts.data.posts.map((post) => {
         if (post.id === postId) {
           return { ...post, opinions };
         }
         return post;
       });

       return updatedPosts;
    })
  }
  return {post,setPost, posts, setPosts, updateOpinions };
}
export default createContainer(Posts);
