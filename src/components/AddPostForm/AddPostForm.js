import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import "./AddPostForm.scss";
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const AddPostForm = ({ onPostAdded }) => {
    const [form] = Form.useForm();
    const [posts, setPosts] = useState([]);
    console.log(posts);
    const handleAddedPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        onPostAdded(newPost);
    };
    // Add(POST) Posts
    const onSubmit = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}`, values);
            notification.success({
                message: "Success",
                description: "Post created successfully!",
            });
            handleAddedPost(response.data);
            form.resetFields();
        }
        catch (error) {
            console.error(error);
            notification.error({
                message: "Error",
                description: "Failed to create post.",
            });
        }
    };
    return (_jsx("div", { className: "PostForm", children: _jsxs(Form, { form: form, layout: "vertical", onFinish: onSubmit, children: [_jsx(Form.Item, { name: "title", label: "Title", rules: [{ required: true, message: "Title is required" }], children: _jsx(Input, { placeholder: "Enter title" }) }), _jsx(Form.Item, { name: "body", label: "Body", rules: [{ required: true, message: "Body is required" }], children: _jsx(Input.TextArea, { rows: 4, placeholder: "Enter body" }) }), _jsx(Button, { type: "primary", htmlType: "submit", children: "Add Post" })] }) }));
};
export default AddPostForm;
