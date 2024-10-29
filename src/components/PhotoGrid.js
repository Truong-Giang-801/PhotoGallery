// src/components/PhotoGrid.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PhotoGrid.css';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.unsplash.com/photos`, {
        params: { page, per_page: 10 },
        headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}` }
      });
      setPhotos((prev) => [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <Link to={`/photos/${photo.id}`}>
            <img src={photo.urls.thumb} alt={photo.alt_description} />
            <p>{photo.user.name}</p>
          </Link>
        </div>
      ))}
      {loading && <p>Loading more photos...</p>}
      {!hasMore && <p>No more photos to load.</p>}
    </div>
  );
};

export default PhotoGrid;
