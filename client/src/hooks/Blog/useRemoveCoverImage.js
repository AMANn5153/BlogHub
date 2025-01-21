import {toast} from "react-toastify";
import { useState } from "react";


const useRemoveCoverImage = () =>{
    const [loading, setLoading] = useState(false);

    const removeCoverImage = async(name) =>{   
        try{
            setLoading(true);
            if(!name){
                setLoading(false);
                return;
            }
            await fetch(`http://localhost:3001/api/v1/blog/deleteCoverImage?name=${name}`,{
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
    }

    return {removeCoverImage, loading};
}

export default useRemoveCoverImage;