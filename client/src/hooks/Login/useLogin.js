import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../utils/authFetch";
import useTokenContext from "../../context/tokenContext.js/useTokenContext";

const useLogin = () => {
    const[loading, setLoading] = useState(false);
    const {setAuth} = useAuthContext();
    const {setToken} = useTokenContext();
    const navigate = useNavigate();


    const Login = async({usernameOrEmail, password}) =>{
        
        setLoading(true);

        if(!checkFields(usernameOrEmail, password)){
            setLoading(false);
            return false;
        }

        try{
            const response = await fetch("http://localhost:3001/api/v1/auth/loginUser",{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",                
                },
                body:JSON.stringify({usernameOrEmail, password})
            }); 

            const res = await response.json();
            
            if(!response.ok){

                throw new Error(res.message);
            }
            sessionStorage.setItem("user", JSON.stringify(res.user));
            setAuth(res.user);
            sessionStorage.setItem("token", JSON.stringify(res.token));
            setToken(res.token);
            navigate("/");
            
        }catch(error){
            console.log("Error in login", error.message);
            toast.error(error.message,{
                position:"top-right",
                autoClose:2000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                theme:"dark",
                style:{zIndex:200000},
            });
        }finally{
            setLoading(false);
        }
    }
    return {Login, loading};
}



const checkFields = (usernameOrEmail, password) => {

    if(!usernameOrEmail || !password){
        toast.error("Please fill all credentials",{
            position:"top-center",
            autoClose:2000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:"dark",
        });
        return false;
    }

    return true;
}



export default useLogin;