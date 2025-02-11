import React, { createContext, useState} from 'react';

export const BlogContext = createContext();


// Create a provider component
export const BlogProvider = ({ children }) => {
    const [isBlogCreated, setIsBlogCreated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false); 
  
   
    return (
        <BlogContext.Provider value={{ isBlogCreated, setIsBlogCreated, refresh, setRefresh, isEditButtonClicked, setIsEditButtonClicked}}>
            {children}
        </BlogContext.Provider>
    );
}