import {useState} from "react";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../utils/authFetch";

const useChangePassword = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const {setAuth, setToken} = useAuthContext();
    const Navigate = useNavigate();
    const {authFetch} = useAuthFetch();

    const changePassword = async (password, confirmPassword, token) => {
        
        try{
            setIsLoading(true);
            if(!token){
                throw new Error("token is required");
            }
            if(password !== confirmPassword){
                throw new Error("Passwords do not match");
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/changePassword`,{
                method : "PUT",
                credentials: "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({password, confirmPassword, token})
            });

            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message);
            }

            setAuth(responseData.data);
            setToken(responseData.authToken);
            sessionStorage.setItem("token", JSON.stringify(responseData.authToken));
            Navigate("/");
        }
        catch(error){
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }finally{
            setIsLoading(false);
        }
    }
    return {changePassword, isLoading};

}

export default useChangePassword;