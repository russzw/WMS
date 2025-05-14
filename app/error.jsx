"use client";

import React from 'react';
import './ErrorPage.css';

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Oops!</h1>
        <p className="error-message">Something went wrong. We're working on getting this fixed as soon as we can.</p>
        <button className="error-button" onClick={() => window.location.href = '/dashboard'}>Go back</button>
      </div>
    </div>
  );
};

export default Error;
