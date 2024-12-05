import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import "./AddPostForm.scss";
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface AddPostFormProps {
  onPostAdded: (newPost: Post) => void;
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const AddPostForm: React.FC<AddPostFormProps> = ({ onPostAdded }) => {
  const [form] = Form.useForm();
  const [posts, setPosts] = useState<Post[]>([]);

  console.log(posts);

  const handleAddedPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    onPostAdded(newPost);
  };

  // Add(POST) Posts
  const onSubmit = async (values: Post) => {
    try {
      const response = await axios.post<Post>(`${API_BASE_URL}`, values);
      notification.success({
        message: "Success",
        description: "Post created successfully!",
      });
      handleAddedPost(response.data);
      form.resetFields();
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "Failed to create post.",
      });
    }
  };

  return (
    <div className="PostForm">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: "Body is required" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter body" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPostForm;
