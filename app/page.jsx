"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import './Homepage.css'; // Ensure you have this CSS file

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 9000); // Redirect after 9 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="homepage-container">
      <div className="welcome-animation">
        <h1>HC WMS DASHBOARD!</h1>
      </div>
    </div>
  );
};

export default Homepage;
