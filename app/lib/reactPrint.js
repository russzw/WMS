"use client"
import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print'
import Chart from "../ui/dashboard/chart2/chart"
import styles from "./reactPrint.module.css"
import Transactions from "@/app/ui/dashboard/transactions/transactions"

const ReactPrint = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'sample',
    onAfterPrint: () => alert('Print success')
  });
  return (
    <div>
      <div ref = {componentRef} className={styles.container}>
        {/* <Transactions/> */}
        <Chart/>
        <button className={styles.btn} onClick={handlePrint}>Print</button>
      </div>
    </div>
  )
}

export default ReactPrint;