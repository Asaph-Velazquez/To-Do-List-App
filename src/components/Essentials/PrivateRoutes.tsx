import { Navigate } from "react-router-dom";

function PrivateRoutes({children}:{children: React.ReactNode}){
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/login" replace />;
}
export default PrivateRoutes;