import {useState} from "react";
import { toast } from "react-toastify";
import useAuthFetch from "../../utils/authFetch";
const useForgetPassword = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const {authFetch} = useAuthFetch();

    const forgetPassword = async(email) =>{
        try{
            setIsLoading(true);
            if(!email){
                throw new Error("email is required");
            }
            const response = await fetch(`http://localhost:3001/api/v1/auth/forgetPassword`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email})
            });
            
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setIsSuccess(true);

            toast.success("Email has been sent", {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark",
            });
            
        }
        catch(error){
            console.log(error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,    
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark",
            });
        }
        finally{
            setIsLoading(false);
        }
    }

    return {forgetPassword, isLoading, isSuccess};
}

export default useForgetPassword;