import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../../component/Navbar';
import {BlogContext} from "../../context/Context"
import "../../styles/Home.css";
import { fetchBlogs , blogView} from './HomeFunctions';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const { isBlogCreated, setIsBlogCreated } = useContext(BlogContext); 
    const navigate = useNavigate();
    

    useEffect(() => {
      fetchBlogs(setBlogs, setIsBlogCreated);
    }, [isBlogCreated, setIsBlogCreated]);

    return (
        <>
            <Navbar/>
            <div className="home-container">
                <ul className="blog-list">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="blog-item" onClick={() => blogView(navigate, blog)}>
                            <div className="title">{blog.title}</div>
                            <div className="paragraph">{blog.paragraph}</div>
                            <div className="username">{blog.username}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Home;
