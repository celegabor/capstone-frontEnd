import React, { createContext, useState } from "react";

export const PostProvider = createContext();

const PostContext = ({children}) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   return (
        <PostProvider.Provider value={{products, setProducts, errors, setErrors, loading, setLoading, show, setShow, handleClose, handleShow}}>
            {children}
        </PostProvider.Provider>
   )
}

export default PostContext;