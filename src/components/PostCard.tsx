import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../data";
import "./PostCard.css";

interface PostCardProps {
    post: Post;
    onDelete: (id: string) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
    const handleDeleteClick = () => {
        if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
            onDelete(post.id);
        }
    };

    return (
    <div className="post-card">
      <div className="post-card-category">{post.category}</div>
      <img
        src={post.thumbnailUrl}
        alt={post.title}
        className="post-card-thumbnail"
      />
      <div className="post-card-content">
        <h3>{post.title}</h3>
        <p className="post-card-meta">
          Tác giả: {post.author} | Ngày đăng: {post.publishedDate}
        </p>
        <p>{post.content.substring(0, 100)}...</p>
        <div className="post-card-actions">
          <Link to={`/posts/${post.id}`} className="btn btn-primary">
            Đọc thêm
          </Link>
        </div>
      </div>
    </div>
    );
};

export default PostCard;
