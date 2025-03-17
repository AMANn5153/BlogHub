import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import { toast } from "react-toastify";
import useAuthFetch from "../../utils/authFetch";

const useBlogImage = (image) => {
    const[loading, setLoading] = useState(false);
    const {auth} = useAuthContext();
    const {authFetch} = useAuthFetch(); 

    const uploadImage = async (image) =>{
        if(!image || !auth){
            return ; 
        }
        const formData = new FormData();
        formData.append("image", image);
        try {
            setLoading(true);
            const response = await authFetch(`${process.env.REACT_APP_API_URL}/blog/uploadImage?userId=${auth._id}`,{
                method : "POST",
                credentials : "include",
                body: formData
            });

            const responseData = await response.json();
            
            if(!response.ok){
                throw new Error(responseData.message);
            }

            return ({url : responseData.url, name : responseData.name});

        } catch (error) {
            console.log(error);
            toast.error(error.message,{
                position : "top-right",
                autoClose : 5000,
                hideProgressBar : true,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,
            });
        }finally{
            setLoading(false);
        }
    }
    return {uploadImage, loading};
}


export default useBlogImage;