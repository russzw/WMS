"use client";

// ./../../login/page.tsx
import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/login/login.module.css";
import { authenticate } from "../lib/actions";

const LoginPage = () => {
  const errorRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
      const isSuccess = await authenticate(formData);

      if (isSuccess) {
        errorRef.current.textContent = "";
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        errorRef.current.textContent = "Incorrect username or password";
      }
    } catch (error) {
      errorRef.current.textContent = "An error occurred during login. Please try again.";
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <p ref={errorRef} className={styles.error}></p>
        <input type="text" placeholder="Username" name="username" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;





















// import styles from "@/app/ui/login/login.module.css"
// import { authenticate } from "../lib/actions";
// // import LoginForm from "../ui/login/loginForm/loginForm";

// const LoginPage = () => {


//   return (
//     <div className={styles.container}>
//       <form action={authenticate} className={styles.form}>
//          <h1 className={styles.title}>Login</h1>
//            <input type="text" placeholder="username" name="username"/>
//            <input type="password" placeholder="password" name="password"/>
//            <button> Login</button>
//        </form>
//     </div>
//   );
// };

// export default LoginPage;

// ./../../login/page.tsx

// "use client"
// // ./../../login/page.tsx
// import { useRef } from "react";
// import { useRouter } from "next/navigation";
// import styles from "@/app/ui/login/login.module.css";
// import { authenticate } from "../lib/actions";

// const LoginPage = () => {
//   const errorRef = useRef(null);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const isSuccess = await authenticate(formData);

//     if (isSuccess) {
//       errorRef.current.textContent = "";
//       router.push("/dashboard"); // Redirect to dashboard
//     } else {
//       errorRef.current.textContent = "Incorrect username or password";
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <h1 className={styles.title}>Login</h1>
//         <p ref={errorRef} className={styles.error}></p>
//         <input type="text" placeholder="Username" name="username" />
//         <input type="password" placeholder="Password" name="password" />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;