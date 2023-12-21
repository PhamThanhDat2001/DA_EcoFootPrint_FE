// // withAuth.js

// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import Storage from '../storage/storage';

// function withAuth(AuthenticatedComponent) {
//   return class HOC extends React.Component {
//     isAuthenticated = () => {
//       return Storage.getToken() !== null && Storage.getToken() !== undefined;
//     };

//     render() {
//       return this.isAuthenticated() ? (
//         <AuthenticatedComponent {...this.props} />
//       ) : (
//         <Redirect to="/signin" />
//       );
//     }
//   };
// }
// export default withAuth;


// import React from 'react';

// import  redirect  from 'react-router-dom';
// import Storage from '../storage/storage';

// function withAuth(AuthenticatedComponent) {
//   return class HOC extends React.Component {
//     render() {
//       return !Storage.getToken() ? (
//         redirect("/login")
//       ) : (
//         <AuthenticatedComponent {...this.props} />
//       );
//     }
//   };
// }

// export default withAuth;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Storage from '../storage/storage';

function WithAuth(AuthenticatedComponent) {
  return function HOC(props) {
    const navigate = useNavigate(); // Initialize useNavigate

    React.useEffect(() => {
      if (!Storage.getToken()) {
        // Perform programmatic navigation to "/login"
        navigate('/signin');
      }
    }, [navigate]);

    // Render AuthenticatedComponent if authenticated
    return Storage.getToken() ? <AuthenticatedComponent {...props} /> : null;
  };
}

export default WithAuth;
