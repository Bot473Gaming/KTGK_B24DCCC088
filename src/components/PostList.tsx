import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Post } from "../data";
import PostCard from "./PostCard";
import "./PostList.css";

interface PostListProps {
    posts: Post[];
    setPosts: Dispatch<SetStateAction<Post[]>>;
}

const PostList = ({ posts, setPosts }: PostListProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleDeletePost = (id: string) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

  const sortedAndFilteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

    return (
        <div className="post-list-container">
            <div className="post-list-header">
                <h2>Tổng số bài viết: {sortedAndFilteredPosts.length}</h2>
                <Link to="/create" className="btn btn-primary">
                    Viết bài mới
                </Link>
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="post-list-grid">
                {sortedAndFilteredPosts.map((post: Post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostList;
