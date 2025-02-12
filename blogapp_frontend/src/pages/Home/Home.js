import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../component/Navbar';
import "../../styles/Home.css";
import { fetchBlogs , blogView} from './HomeFunctions';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const dispatch = useDispatch();
    const isBlogCreated = useSelector(state => state.Blog.isBlogCreated);
    const navigate = useNavigate();
    

    useEffect(() => {
      fetchBlogs(setBlogs, dispatch);
    }, [isBlogCreated, dispatch]);

    return (
        <>
            <Navbar/>
            <div className="home-container">
                <ul className="blog-list">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="blog-item" onClick={() => blogView(navigate, blog._id)}>
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
