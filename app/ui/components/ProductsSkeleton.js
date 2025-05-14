// components/ProductsSkeleton.js
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import styles from '@/app/ui/dashboard/products/products.module.css';

const ProductsSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td>
                <Skeleton variant="rectangular" width={150} height={40} />
              </td>
              <td>
                <Skeleton variant="text" width={250} />
              </td>
              <td>
                <Skeleton variant="text" width={80} />
              </td>
              <td>
                <Skeleton variant="text" width={120} />
              </td>
              <td>
                <Skeleton variant="text" width={50} />
              </td>
              <td>
                <Skeleton variant="rectangular" width={100} height={40} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsSkeleton;
