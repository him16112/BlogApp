import React, { createContext, use, useState} from 'react';

export const BlogContext = createContext();


// Create a provider component
export const BlogProvider = ({ children }) => {
    const [isBlogCreated, setIsBlogCreated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [allComments, setAllComments] = useState([]);


   
    return (
        <BlogContext.Provider value={{ isBlogCreated, setIsBlogCreated, refresh, setRefresh}}>
            {children}
        </BlogContext.Provider>
    );
}