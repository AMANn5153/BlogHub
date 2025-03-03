import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useSaveStore from "../../store/useSaveStore";
import useAuthContext from "../../context/authContext/useAuthContext";

const useGetSave = (_id) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const {saveBlogByUser} = useSaveStore();
    useEffect(()=>{
        const getSave = async () => {
            try{
                setSaveLoading(true);
                const response = await fetch(`http://localhost:3001/api/v1/save/getSaveBlog?id=${_id}`, {
                    method : "GET",
                    credentials : "include",
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }

                saveBlogByUser(responseData.data);

            }
            catch(err){
                console.log(err);
                toast.error(err.message, {
                    position : "top-right",
                    autoClose : 5000,
                    hideProgressBar : false,
                    closeOnClick : true,
                    pauseOnHover : true,
                    draggable : true,
                    progress : undefined,   
                });
            }
            finally{
                setSaveLoading(false);
            }
        }
        getSave();
    },[_id]);
    return { saveLoading};
    }


export default useGetSave;