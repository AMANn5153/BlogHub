import { useState } from "react";
import {toast} from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuth} = useAuthContext();
    const navigate = useNavigate();
    const signup = async({username, email, fullname, image, password, confirmPassword})=>{
        try{
            setLoading(true);

         
            if(!checkFields(username, email, fullname, password, confirmPassword)){
                setLoading(false);
                return;
            }

            console.log(image, username, email, fullname, password, confirmPassword);

            const formData = new FormData();

            formData.append("username", username);
            formData.append("email", email);
            formData.append("fullname", fullname);
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);

            if(image)
                formData.append("image", image);

            const response = await fetch("http://localhost:3001/api/v1/auth/createUser",{
                credentials:"include",
                method:"POST",
                body:formData
            })

            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message);
            }

            localStorage.setItem("user", JSON.stringify(responseData.data));
            setAuth(responseData.data);
            navigate("/");

        }catch(error){
            toast.error(error.message,{
                position:"top-right",
                autoClose:2000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                theme:"dark",
            }); 
        }finally{
            setLoading(false);
        }

    }
    return {signup, loading};

}



const checkFields = (username, email, fullname, password, confirmPassword)=>{
    if(!username || !email || !fullname || !password || !confirmPassword){
        toast.error("please fill all the fields",{
            position:"top-right",
            autoClose:2000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:"dark",
        });
        return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
        toast.error("Please enter a valid email",{
            position:"top-right",
            autoClose:2000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:"dark",
        });
        return false;
    }

    if(password.length < 8){
        toast.error("Password must be at least 8 characters long",{
            position:"top-center",
            autoClose:2000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:"dark",
        });
        return false;
    }

    if(password !== confirmPassword){
        console.log("error");
        toast.error("Passwords do not match",{
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

export default useSignup;
