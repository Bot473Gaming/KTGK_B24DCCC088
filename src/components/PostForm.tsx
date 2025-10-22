import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../data';
import './PostForm.css';

interface PostFormProps {
  onSave: (post: Post) => void;
}

const PostForm = ({ onSave }: PostFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    id: '',
    title: '',
    author: '',
    thumbnailUrl: '',
    content: '',
    category: 'Công nghệ',
    publishedDate: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const postToEdit = storedPosts.find((p: Post) => p.id === id);
      if (postToEdit) {
        setPost(postToEdit);
      }
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!post.title) newErrors.title = 'Tiêu đề không được để trống.';
    else if (post.title.length < 10) newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự.';
    if (!post.author) newErrors.author = 'Tác giả không được để trống.';
    else if (post.author.length < 3) newErrors.author = 'Tác giả phải có ít nhất 3 ký tự.';
    if (!post.content) newErrors.content = 'Nội dung không được để trống.';
    else if (post.content.length < 50) newErrors.content = 'Nội dung phải có ít nhất 50 ký tự.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newPost: Post = {
      ...post,
      id: post.id || Date.now().toString(),
      publishedDate: post.publishedDate || new Date().toISOString().split('T')[0],
    };
    onSave(newPost);
    alert(id ? 'Cập nhật thành công!' : 'Đăng bài thành công!');
    navigate(id ? `/posts/${newPost.id}` : '/');
  };

  const handleCancel = () => {
    navigate(id ? `/posts/${id}` : '/');
  };

  return (
    <div className="post-form-container">
      <h2>{id ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="author">Tác giả:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={post.author}
            onChange={handleChange}
          />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="thumbnailUrl">URL ảnh thumbnail:</label>
          <input
            type="text"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={post.thumbnailUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Nội dung bài viết:</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            value={post.content}
            onChange={handleChange}
          ></textarea>
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Thể loại:</label>
          <select id="category" name="category" value={post.category} onChange={handleChange}>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Du lịch">Du lịch</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Đời sống">Đời sống</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {id ? 'Cập nhật' : 'Đăng bài'}
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
