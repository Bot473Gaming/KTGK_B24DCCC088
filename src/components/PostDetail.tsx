import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Post } from '../data';
import './PostDetail.css';

interface PostDetailProps {
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

const PostDetail = ({ setPosts }: PostDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = storedPosts.find((p: Post) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleDeletePost = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((p) => p.id !== id);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return updatedPosts;
      });
      navigate('/');
    }
  };

  if (!post) {
    return <div>Đang tải bài viết...</div>;
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <div className="post-detail-top-actions">
          <div onClick={() => navigate('/')} className="btn btn-secondary">
            {'< Quay lại'}
          </div>
          <div className="post-detail-edit-delete-actions">
            <Link to={`/posts/edit/${post.id}`} className="btn btn-primary">
              Chỉnh sửa
            </Link>
            <button onClick={handleDeletePost} className="btn btn-danger">
              Xóa bài viết
            </button>
          </div>
        </div>
        <h1>{post.title}</h1>
      </div>
      <p className="post-detail-meta">
        Tác giả: {post.author} | Ngày đăng: {post.publishedDate} | Thể loại: {post.category}
      </p>
      <img src={post.thumbnailUrl} alt={post.title} className="post-detail-thumbnail" />
      <div className="post-detail-content">
        <p>{post.content}</p>
      </div>
      
    </div>
  );
};

export default PostDetail;
