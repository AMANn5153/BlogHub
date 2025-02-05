import {useState} from "react";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";

const useCoverImage = () =>{
    const [loading, setLoading] = useState(false); 
    const {auth} = useAuthContext();  
    const {authFetch} = useAuthFetch();

    const uploadCoverImage = async(image) =>{
        try{
            setLoading(true);
            if(!image){
                setLoading(false);
                return;
            }

            const fm = new FormData();

            fm.append("image", image);

            const response = await authFetch("http://localhost:3001/api/v1/blog/uploadCoverImage",{
                method : "POST",
                credentials : "include",
                body : fm
            });

            const responseData = await response.json();
            
            if(!response.ok){
                throw new Error(responseData.message);
            }

            return ({url : responseData.url, name : responseData.name});

        }
        catch(err){
            console.log(err);
            toast.error(err.message,{
                position : "top-right",
                autoClose : 5000,
                hideProgressBar : true,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,
            });
        }
        finally{
            setLoading(false);
        }
    }

    return {uploadCoverImage, loading};
}

export default useCoverImage;