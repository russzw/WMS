"use client"
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'transparent', // Set background to transparent
      color: theme === 'light' ? '#000' : '#fff',
      transition: 'color 0.3s', // Only transition color
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: theme === 'light' ? '#000' : '#fff',
      color: theme === 'light' ? '#fff' : '#000',
      border: 'none',
      borderRadius: '5px',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Settings</h1>
      <button style={styles.button} onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Settings;
