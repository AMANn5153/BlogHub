import { useState } from "react";
import useCommentStore from "../../store/useCommentStore";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";

const usePostReply = () => {
    const [replyPostLoading, replyPostSetLoading] = useState(false);
    const { setReply } = useCommentStore();
    const {auth} = useAuthContext();
    const {authFetch} = useAuthFetch();

    const postReply = async ({reply, replyInText, commentSlug}) => {
        if(reply === "<p></p>"){
            toast.error("empty reply is not allowed");
            return;
        }
        try{
            if(!commentSlug){
                return;
            }   
            
            replyPostSetLoading(true);
            
            const response = await authFetch(`${process.env.REACT_APP_API_URL}/comment/newReply?commentSlug=${commentSlug}`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials: "include",
                body : JSON.stringify({reply, replyInText})
            });
            
            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message);
            }
            
            setReply(responseData.data);
        
        }
        catch(err){
            console.warn(err.message);
            toast.error(err.message, {
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
            replyPostSetLoading(false);
        }
    }

    return {postReply, replyPostLoading};
}

export default usePostReply;