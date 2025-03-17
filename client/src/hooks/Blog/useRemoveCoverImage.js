import {toast} from "react-toastify";
import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";


const useRemoveCoverImage = () =>{
    const [loading, setLoading] = useState(false);
    const {auth} = useAuthContext();
    const {authFetch} = useAuthFetch();

    const removeCoverImage = async(name) =>{   
        try{
            setLoading(true);
            if(!name){
                setLoading(false);
                return;
            }
            await authFetch(`${process.env.REACT_APP_API_URL}/blog/deleteCoverImage?name=${name}`,{
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