import Image from 'next/image';
import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
  MdOutlineMap,
  MdOnlinePrediction,
  MdLibraryBooks,
  MdAreaChart,
  MdStorage,
  MdUploadFile,
} from 'react-icons/md';
import { auth, signOut } from 'app/auth.js';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Block-Store",
        path: "/dashboard/blockstore",
        icon: <MdStorage />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Predictions",
        path: "/dashboard/predictions",
        icon: <MdOnlinePrediction />,
      },
      {
        title: "Map",
        path: "/dashboard/map",
        icon: <MdOutlineMap/>,
      },
      // {
      //   title: "Live IOT Data",
      //   path: "/dashboard/reports",
      //   icon: <MdAnalytics/>,
      // },
      {
        title: "Live IOT Data",
        path: "/dashboard/visualization",
        icon: <MdAreaChart />,
      },
      {
        title: "Generate Reports",
        path: "/dashboard/print",
        icon: <MdLibraryBooks />,
      },
      // {
      //   title: "Upload",
      //   path: "/dashboard/upload",
      //   icon: <MdUploadFile />,
      // },
      // {
      //   title: "View",
      //   path: "/dashboard/view",
      //   icon: <MdUploadFile />,
      // },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const SideBar = async () => {

  const {user} = await auth();
  
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image 
          className={styles.userImage} 
          src={user.img || "/noavatar.png"}
          alt='' 
          width="50" 
          height="50" 
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
      {menuItems.map((cat) => (
        <li key={cat.title}>
          <span className={styles.cat}>{cat.title}</span>
           {cat.list.map(item=>(
            <MenuLink item={item} key={item.title}/>
           ))} </li>
      ))}
      </ul>
      <form action={async () =>{
        "use server"
        await signOut();
      }}>
      <button className={styles.logout}>
        <MdLogout />
        Logout</button>
        </form>
    </div>
  )
}

export default SideBar