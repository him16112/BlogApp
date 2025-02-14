import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../component/Navbar';
import "../../styles/Home.css";
import { blogView, getAllBlogs } from './HomeFunctions';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isBlogCreated = useSelector(state => state.Blog.isBlogCreated);
    const loading = useSelector(state => state.Blog.loading);
    const error = useSelector(state => state.Blog.error);
    const blogs = useSelector(state => state.Blog.allBlogs);

    useEffect(() => {
        const fetchBlogs = async () => {
            await getAllBlogs(dispatch);
        };
        fetchBlogs();
    }, [isBlogCreated, dispatch]);

    return (
        <>
            <Navbar />
            <div className="home-container">
                {loading && <p className="loading-text">Loading blogs...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && !error && blogs.length === 0 && <p className="empty-text">No blogs available.</p>}
                
                {!loading && !error && (
                    <ul className="blog-list">
                        {blogs.map((blog) => (
                            <li key={blog._id} className="blog-item" onClick={() => blogView(blog._id, navigate)}>
                                <div className="title">{blog.title}</div>
                                <div className="paragraph">{blog.paragraph}</div>
                                <div className="username">{blog.username}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Home;
