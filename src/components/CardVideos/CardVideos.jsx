import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faFile } from '@fortawesome/free-solid-svg-icons'; 
import './cardVideo.css';

const CardVideos = ({ video }) => {
  return (
    <div className="text-light">
      <div className="d-flex p-1">
        <img className="img-avatar-author" src={video.author.avatar} alt="img autore" />
        <p className="name-author">
          {video.author.name} {video.author.lastName}
        </p>
      </div>
      <div className="dettails-post">
        <iframe
            width="400"
            height="315"
            src={video.video}
            frameBorder="0"
            allowFullScreen
            title="Video di YouTube"
        />
        <div>
          <h4>{video.title}</h4>
          <p className='m-0'>
            <FontAwesomeIcon className='mx-2' icon={faHammer} />
            <span className='wrap-text'>{video.categoryWork}</span>
          </p>
          <p className='m-0 mb-3'>
            <FontAwesomeIcon className='mx-2' icon={faFile} />
            <span className='wrap-text'>{video.content}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardVideos;

