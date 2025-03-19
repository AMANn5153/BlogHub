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

    const postReply = async ({reply, commentId})=>{
        if(reply === "<p></p>"){
            toast.error("empty reply is not allowed");
            return;
        }
        try{
            if(!commentId){
                return;
            }   
            
            replyPostSetLoading(true);
            
            const response = await authFetch(`http://localhost:3001/api/v1/comment/newReply?id=${commentId}`, {
                method : "POST",
                credentials : "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({reply})
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