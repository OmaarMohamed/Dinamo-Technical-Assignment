import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Table, notification, Space, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import "./PostsTable.scss";
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const PostsTable = ({ posts }) => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [form] = Form.useForm();
    // Delete(DELETE) Posts
    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            notification.success({
                message: "Deleted",
                description: "Post deleted successfully!",
            });
        }
        catch (error) {
            console.error(error);
            notification.error({
                message: "Error",
                description: "Failed to delete post.",
            });
        }
    };
    // Open edit modal
    const openEditModal = (post) => {
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
    const handleEditPost = async (values) => {
        if (editingPost) {
            try {
                const response = await axios.put(`${API_BASE_URL}/${editingPost.id}`, values);
                notification.success({
                    message: "Updated",
                    description: "Post updated successfully!",
                });
                closeEditModal();
            }
            catch (error) {
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
            render: (_, record) => (_jsxs(Space, { children: [_jsx(Button, { type: "link", onClick: () => openEditModal(record), children: "Edit" }), _jsx(Button, { type: "link", danger: true, onClick: () => handleDeletePost(record.id), children: "Delete" })] })),
        },
    ];
    return (_jsxs("div", { className: "PostsTable", children: [_jsx(Table, { dataSource: posts, columns: columns, loading: loading, rowKey: "id", style: { marginTop: 20 } }), _jsx(Modal, { title: "Edit Post", visible: isModalOpen, onCancel: closeEditModal, footer: null, children: _jsxs(Form, { form: form, layout: "vertical", onFinish: handleEditPost, children: [_jsx(Form.Item, { name: "title", label: "Title", rules: [{ required: true, message: "Title is required" }], children: _jsx(Input, { placeholder: "Enter title" }) }), _jsx(Form.Item, { name: "body", label: "Body", rules: [{ required: true, message: "Body is required" }], children: _jsx(Input.TextArea, { rows: 4, placeholder: "Enter body" }) }), _jsx(Button, { type: "primary", htmlType: "submit", children: "Save" })] }) })] }));
};
export default PostsTable;
