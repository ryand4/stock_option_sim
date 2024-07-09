import React from 'react';
import './Call.css'; // Make sure to import the CSS file

const Call = () => {
  return (
    <div className="container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/video-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1 className="title">Call Option</h1>
        <p>Welcome to our call options simulation page. Here, you can explore various strategies and their potential returns.</p>
        {/* Insert more content as needed */}
      </div>
    </div>
  );
};

export default Call;
