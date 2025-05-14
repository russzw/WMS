'use client';

import { useState } from 'react';
import styles from './UploadPage.module.css';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setMessage('File uploaded successfully!');
    } else {
      try {
        const errorData = await response.json();
        setMessage(`File upload failed: ${errorData.message}`);
      } catch (error) {
        setMessage('File upload failed: Unable to parse error response');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Upload CSV Data</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.fileInput} type="file" accept=".csv" onChange={handleFileChange} />
        <button className={styles.button} type="submit">Upload</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
