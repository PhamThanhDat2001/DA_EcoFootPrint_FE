import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './routes/root.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root'
import ErrorPage from './routes/errorpage.jsx'
import SignUp from './auth/signup.jsx'
import ResetPassword from './auth/ResetPassword.jsx'
import ResetNewPassword from './auth/ResetNewPassword.jsx'
import Signin from './auth/signin.jsx'
import { Provider } from "react-redux";
import store from './redux/store/index.js'
import WithAuth from './HOC/withAuth'
import Profile from './components/profile.jsx'
import Info from './components/info.jsx'
import Changepass from './components/changepass.jsx'

// const AuthenticatedRoot = withAuth(class Root extends React.Component {
//   render() {
//     return (
//       <Root />
//     );
//   }
// });
const NewComponent = WithAuth(Root)
const router = createBrowserRouter([
  { 
    errorElement:<ErrorPage/>,
    path: "/",
    element: <NewComponent someProp="someValue" />,
    // element: <WithAuth component={Root} />,

    // element: <AuthenticatedRoot /> ,
    children: [
      {
        path: "trangchu",
        element:<h2>trang chu</h2>,
      },
      {
        path: "nhatkyhoatdong",
        element:<h2>nhật ký</h2>,
      },
      {
        path: "tinhtoan",
        element:<h2>Tính toán</h2>,
      },
      {
        path: "noidunggiaoduc",
        element:<h2>nội dung dh</h2>,
      },
      {
        path: "congdong",
        element:<h2>Cộng đồngs</h2>,
      },
    
    ],
  },
  // {
  //   path: 'login',
  //   element: <RegisterAndLogin />
  // }
  
   {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/signin',
    element: <Signin/>
  },
  {
    path: '/resetpassword',
    element: <ResetPassword/>
  },
  {
    path: '/auth/new-password/:token',
    element: <ResetNewPassword/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/info',
    element: <Info/>
  },
  {
    path: '/changepass',
    element: <Changepass/>
  }
  
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>,

<React.StrictMode>
    <Provider store={store}>
    
      <RouterProvider router={router} />
     
      </Provider>
  
  </React.StrictMode>
  
)
{/* <React.StrictMode>
    <Provider store={store}>
      <router.Router>
        <RouterProvider router={router} />
      </router.Router>
    </Provider>
  </React.StrictMode>) */}