
import { MdShutterSpeed, MdSupervisedUserCircle } from "react-icons/md"
import styles from "./card.module.css"


const Card2 = () => {


  return (
    <div className={styles.container}>
      <MdShutterSpeed size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Transactions</span>
        <span className={styles.number}>800</span>
        <span className={styles.detail}>
          <span className={styles.positive}>18% </span>
           more than previous week
        </span>
      </div>
    </div>
  )
}

export default Card2