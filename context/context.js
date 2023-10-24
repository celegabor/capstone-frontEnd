import React, { createContext, useState } from "react";

export const PostProvider = createContext();

const PostContext = ({children}) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(null);
 




   return (
        <PostProvider.Provider value={{products, setProducts, errors, setErrors, loading, setLoading}}>
            {children}
        </PostProvider.Provider>
   )
}

export default PostContext;