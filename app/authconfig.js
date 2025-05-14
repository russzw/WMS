// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request }) {
//       const isLoggedIn = auth?.user;
//       const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

//       if (isOnDashboard) {
//         // User is trying to access a protected dashboard route
//         if (isLoggedIn) {
//           // User is logged in, allow access
//           return true;
//         } else {
//           // User is not logged in, redirect to the login page
//           return Response.redirect(new URL("/login", request.nextUrl));
//         }
//       } else {
//         // User is on a non-protected route
//         if (isLoggedIn) {
//           // If logged in and not on dashboard, redirect to dashboard
//           return Response.redirect(new URL("/dashboard", request.nextUrl));
//         }
//         // Otherwise, allow access to the non-protected route
//         return true;
//       }
//     },
//   },
// };



// export const authConfig = {
//   providers:[],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({auth, request}){
//       const isLoggedIn = auth?.user;
//       const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false;
//       }else if(isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", request.nextUrl));
//       }
//       return true;
//     },
//   },
// };

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) {
          // User is trying to access a protected dashboard route and is logged in, allow access
          return true;
        } else {
          // User is not logged in, redirect to the login page
          return Response.redirect(new URL("/login", request.nextUrl));
        }
      } else {
        // User is on a non-protected route
        if (isLoggedIn) {
          // If logged in and not on dashboard, redirect to dashboard
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
        // Otherwise, allow access to the non-protected route
        return true;
      }
    },
  },
};


// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async authorized({ auth }) {
//       return !!auth?.user;
//     },
//   },
// };