import {useState} from "react";
import { toast } from "react-toastify";

const useCoverImage = () =>{
    const [loading, setLoading] = useState(false); 
    

    const uploadCoverImage = async(image) =>{
        try{
            console.log(image);
            setLoading(true);
            if(!image){
                setLoading(false);
                return;
            }

            const fm = new FormData();

            fm.append("image", image);

            const response = await fetch("http://localhost:3001/api/v1/blog/uploadCoverImage",{
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