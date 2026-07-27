import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useSaveStore from "../../store/useSaveStore";
import useAuthFetch from "../../utils/authFetch";

const useGetSave = (_id) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const {saveBlogByUser} = useSaveStore();
    const {authFetch} = useAuthFetch();

    useEffect(()=>{
        const getSave = async () => {
            try{
                setSaveLoading(true);
                const response = await authFetch(`${process.env.REACT_APP_API_URL}/save/getSaveBlog?id=${_id}`, {
                    method : "GET",
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