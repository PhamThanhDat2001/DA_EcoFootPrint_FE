

import {
    useLocation,
    Navigate,
} from "react-router-dom";

import { useAuth } from "../main";

export default function RequireAuth({ children }) {
    // context api lấy ra state
    let auth = useAuth();
    let location = useLocation();
    // Nếu như tìm trong localStorage mà k có token User thì đưa về trang login
    const geUserStorage = localStorage.getItem('token');
    if (!geUserStorage) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // trả về root ở đây
    return children;
}


// vi dụ
// RequireAuth
{/* <COMPonenta>

    // children
    <componentcon1></componentcon1>
    <componentcon1></componentcon1>
    <componentcon1></componentcon1>
</COMPonenta> */}