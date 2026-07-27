import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const useLogin = () => {
    const[loading, setLoading] = useState(false);
    const {setAuth, setToken} = useAuthContext();
    const navigate = useNavigate();

    const Login = async({usernameOrEmail, password}) =>{
        
        setLoading(true);

        if(!checkFields(usernameOrEmail, password)){
            setLoading(false);
            return false;
        }
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/loginUser`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",                
                },
                body:JSON.stringify({usernameOrEmail, password})
            }); 

            const res = await response.json();
            
            if(!response.ok){

                throw new Error(`${res.message} `);
            }
            setAuth(res.user);
            sessionStorage.setItem("token", JSON.stringify({token : res.token}));
            setToken(res.token);
            navigate("/");
            
        }catch(error){
            console.error("Error in login", error.message);
            toast.error(error.message,{
                position:"top-right",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
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
            position:"top-right",
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