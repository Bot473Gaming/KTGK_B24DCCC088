import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import { Post, initialPosts } from "./data";
import "./App.css";

function App() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const storedPosts = localStorage.getItem("posts");
        if (storedPosts && JSON.parse(storedPosts).length > 0) {
            setPosts(JSON.parse(storedPosts));
        } else {
            setPosts(initialPosts);
            localStorage.setItem("posts", JSON.stringify(initialPosts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    const handleSavePost = (newPost: Post) => {
        setPosts((prevPosts) => {
            const existingPostIndex = prevPosts.findIndex(
                (p) => p.id === newPost.id,
            );
            if (existingPostIndex > -1) {
                const updatedPosts = [...prevPosts];
                updatedPosts[existingPostIndex] = newPost;
                return updatedPosts;
            } else {
                return [...prevPosts, newPost];
            }
        });
    };

    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route
                        path="/"
                        element={<PostList posts={posts} setPosts={setPosts} />}
                    />
                    <Route
                        path="/create"
                        element={<PostForm onSave={handleSavePost} />}
                    />
                    <Route path="/posts/:id" element={<PostDetail setPosts={setPosts} />} />
                    <Route
                        path="/posts/edit/:id"
                        element={<PostForm onSave={handleSavePost} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
