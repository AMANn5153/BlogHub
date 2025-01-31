import {toast} from "react-toastify";
import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";


const useRemoveCoverImage = () =>{
    const [loading, setLoading] = useState(false);
    const {auth} = useAuthContext();

    const removeCoverImage = async(name) =>{   
        try{
            setLoading(true);
            if(!name){
                setLoading(false);
                return;
            }
            await fetch(`http://localhost:3001/api/v1/blog/deleteCoverImage?name=${name}`,{
                method : "DELETE",
                headers: {
                    'Authorization' : `Bearer ${auth}`,
                }
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