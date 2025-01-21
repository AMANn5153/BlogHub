import {useState} from "react";
import { toast } from "react-toastify";


const useRemoveImage = () =>{
    const [loading, setLoading] = useState(false);
    
    const removeImage = async(name)=>{
        if(!name){
            return;
        }
        try{
            setLoading(true);
            await fetch(`http://localhost:3001/api/v1/blog/deleteImage?name=${name}`,{
                method : "DELETE",
                credentials : "include",
            });
            
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

    return {removeImage, loading};
}

export default useRemoveImage;