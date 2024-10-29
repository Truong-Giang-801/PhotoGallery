import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PhotoDetail.css';

const PhotoDetail = () => {
  const { id } = useParams(); // Get the photo ID from URL parameters
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch photo detail based on the photo ID
  useEffect(() => {
    const fetchPhotoDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}` }
        });
        setPhoto(response.data);
      } catch (error) {
        console.error("Error fetching photo details:", error);
      }
      setLoading(false);
    };

    fetchPhotoDetail();
  }, [id]); // Only re-fetch when the id changes

  if (loading) return <p>Loading photo details...</p>;
  if (!photo) return <p>Photo not found.</p>;

  return (
    <div className="photo-detail">
      <div className="photo-container">
        <div className="image-wrapper"> {/* New wrapper for rounded corners */}
          <img src={photo.urls.regular} alt={photo.alt_description} className="detail-image" />
        </div>
        <div className="details-container">
        <h2>{photo.description || "Untitled"}</h2>

          <p>by {photo.user.name}</p>
          <p>{photo.alt_description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
