import { useState } from "react";
import useCommentStore from "../../store/useCommentStore";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";

const usePostReply = () => {
    const [replyPostLoading, replyPostSetLoading] = useState(false);
    const { setReply } = useCommentStore();
    const {auth} = useAuthContext();

    const postReply = async ({reply, commentId})=>{
        try{
            if(!commentId || !reply){
                return;
            }        
            replyPostSetLoading(true);
            
            const response = await fetch(`http://localhost:3001/api/v1/comment/newReply?id=${commentId}`, {
                method : "POST",
                headers : {
                    'Authorization' : `Bearer ${auth}`,
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