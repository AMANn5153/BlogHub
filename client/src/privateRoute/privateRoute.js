import { Navigate } from "react-router-dom";
import useTokenContext from "../context/tokenContext.js/useTokenContext";

const PrivateRoute = ({children})=>{
    const {token} = useTokenContext();

    return (
        <>
            {token ? children :<> <Navigate to="/"/></>}
        </>
    )
}

export default PrivateRoute;

