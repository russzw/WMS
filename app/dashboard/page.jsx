import Card from "../ui/dashboard/card/card"
import Card2 from "../ui/dashboard/card2/card"
import Chart from "../ui/dashboard/charttest/chart"
import styles from "../ui/dashboard/dashboard.module.css"
// import Rightbar from "../ui/dashboard/rightbar/rightbar"
// import Transactions from "../ui/dashboard/transactions/transactions"


const Dashboard = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
         <div className={styles.cards}>
          <Card />
          <Card2 />
          <Card />
        </div>
        {/* <Transactions /> */}
        <Chart />
      </div>
      {/* <div className={styles.side}>
        <Rightbar />
      </div> */}
    </div>
  )
}

export default Dashboard