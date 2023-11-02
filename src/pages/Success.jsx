import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function Success() {
  const { token } = useParams();
  
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(token));
  }, [token]);

  return <Navigate to="/home" replace={true} />;
}

export default Success;
