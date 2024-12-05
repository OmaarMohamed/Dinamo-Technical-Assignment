import React from "react";
import { useState } from "react";
import { Table, notification, Space, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import "./PostsTable.scss";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsTableProps {
  posts: Post[];
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const PostsTable: React.FC<PostsTableProps> = ({ posts }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();

  // Delete(DELETE) Posts
  const handleDeletePost = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      notification.success({
        message: "Deleted",
        description: "Post deleted successfully!",
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "Failed to delete post.",
      });
    }
  };

  // Open edit modal
  const openEditModal = (post: Post) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setIsModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingPost(null);
    setIsModalOpen(false);
    form.resetFields();
  };

  // Edit(PUT) Posts
  const handleEditPost = async (values: Post) => {
    if (editingPost) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/${editingPost.id}`,
          values
        );
        notification.success({
          message: "Updated",
          description: "Post updated successfully!",
        });
        closeEditModal();
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Error",
          description: "Failed to update post.",
        });
      }
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Body", dataIndex: "body", key: "body" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Post) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeletePost(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="PostsTable">
      <Table
        dataSource={posts}
        columns={columns}
        loading={loading}
        rowKey="id"
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Edit Post"
        visible={isModalOpen}
        onCancel={closeEditModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditPost}>
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
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsTable;
