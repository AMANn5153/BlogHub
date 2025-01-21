import { Navigate } from "react-router-dom";
import useAuthContext from "../context/authContext/useAuthContext";

const PrivateRoute = ({children})=>{

    const {auth} = useAuthContext();
    return (
        <>
            {auth ? children : <Navigate to="/login"/>}
        </>
    )
}

export default PrivateRoute;

