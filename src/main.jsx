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
const router = createBrowserRouter([
  {
    errorElement:<ErrorPage/>,
    path: "/",
    element: <Root/>,
    // element: <RequireAuth><Root/></RequireAuth> ,
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
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
