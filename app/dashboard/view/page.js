'use client';

import { useEffect, useState } from 'react';
import styles from './ViewRecordsPage.module.css';

export default function ViewRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/records?page=${page}`);
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        } else {
          setError('Error fetching records');
        }
      } catch (error) {
        setError('Error fetching records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <h1>Stored Records</h1>
      {records.length === 0 ? (
        <p>No records found</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                {Object.keys(records[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  {Object.values(record).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage} disabled={records.length < 10}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
