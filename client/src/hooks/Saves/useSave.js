import { useState } from "react";
import { toast } from "react-toastify";
import useSaveStore from "../../store/useSaveStore";
import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";

const useSave = () => {
    const [saveLoading, setSaveLoading] = useState(false);
    const {setSaveBlog, unSetSaveBlog} = useSaveStore();
    const {auth} = useAuthContext();
    const {authFetch} = useAuthFetch();

    const postSaveBlog = async (blogId) => {
        try {
            setSaveLoading(true);
            const response = await authFetch(`${process.env.REACT_APP_API_URL}/save/toggleSaveBlog?blogId=${blogId}`, {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message || "Error in saving blog");
            }

            if(responseData.data.length === 0){
                unSetSaveBlog({blogId, userId : auth._id});
            }else{
                setSaveBlog(responseData.data);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setSaveLoading(false);
        }
    }

    return {postSaveBlog, saveLoading};
}

export default useSave;