import { useState } from "react";
import { toast } from "react-toastify";

const usePostReply = () => {
    const [replyPostLoading, replyPostSetLoading] = useState(false);

    const postReply = async ({reply, commentId})=>{
        try{
            if(!commentId || !reply){
                return;
            }        
            replyPostSetLoading(true);
            
            const response = await fetch(`http://localhost:3001/api/v1/comment/newReply?commentId=${commentId}`, {
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