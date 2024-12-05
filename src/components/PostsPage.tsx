import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AddPostForm from "./AddPostForm/AddPostForm";
import PostsTable from "./PostsTable/PostsTable";

interface Post {
  id: number;
  title: string;
  body: string;
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch(GET) Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`${API_BASE_URL}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleAddedPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <AddPostForm onPostAdded={handleAddedPost} />
      <PostsTable posts={posts} />
    </div>
  );
};

export default PostsPage;
