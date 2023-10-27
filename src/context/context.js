import React, { createContext, useState } from "react";

export const PostProvider = createContext();

const PostContext = ({children}) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(null);
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   return (
        <PostProvider.Provider value={{products, setProducts, errors, setErrors, loading, setLoading, showR, setShowR, handleCloseR, handleShowR, handleClose, handleShow, show, setShow}}>
            {children}
        </PostProvider.Provider>
   )
}

export default PostContext;