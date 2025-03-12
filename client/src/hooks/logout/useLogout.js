import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../utils/authFetch";
import useTokenContext from "../../context/tokenContext/useTokenContext";

const useLogout = ()=>{
    const [loading, setLoading] = useState(false);
    const {setAuth, setToken} = useAuthContext();
    const navigate = useNavigate();
    const {authFetch} = useAuthFetch();

    const logout = async()=>{
        try{
            setLoading(true);
       

            const response = await fetch("http://localhost:3001/api/v1/auth/logout",
                {
                    method: "delete",
                    credentials: "include",
                }
            );

            if(!response.ok){
                throw new Error("Failed to logout");
            }

            setAuth(null);
            sessionStorage.removeItem("token");
            setToken(null);
            navigate("/");

        }catch(error){
            console.log("Error in logout", error);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,    
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark",
            }); 
        }finally{
            setLoading(false);
        }
    }

    return {logout, loading};

}


export default useLogout;
