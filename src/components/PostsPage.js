import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import AddPostForm from "./AddPostForm/AddPostForm";
import PostsTable from "./PostsTable/PostsTable";
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    // Fetch(GET) Posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}`);
                setPosts(response.data);
            }
            catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
        fetchPosts();
    }, []);
    const handleAddedPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };
    return (_jsxs("div", { children: [_jsx(AddPostForm, { onPostAdded: handleAddedPost }), _jsx(PostsTable, { posts: posts })] }));
};
export default PostsPage;
