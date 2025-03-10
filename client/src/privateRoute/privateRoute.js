import { Navigate } from "react-router-dom";
import useTokenContext from "../context/tokenContext/useTokenContext";
import useAuthContext from "../context/authContext/useAuthContext";

const PrivateRoute = ({children})=>{
    const {auth} = useAuthContext();
    const {token} = useTokenContext();
    return (
        <>
            {token ? children :<> <Navigate to="/"/></>}
        </>
    )
}

export default PrivateRoute;

