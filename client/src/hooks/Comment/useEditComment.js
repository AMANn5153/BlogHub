import { useState } from "react";
import useCommentStore from "../../store/useCommentStore";
import { toast } from "react-toastify";
import useAuthFetch from "../../utils/authFetch";

const useEditComment = () => {
    const [editCommentLoading, setEditCommentLoading] = useState(false);
    const {setComment} = useCommentStore();
    const {authFetch} = useAuthFetch();

    const updateComment = async (commentId, comment) => {
        try{
            setEditCommentLoading(true);
            const response = await authFetch(`http://localhost:3001/api/v1/comment/editComment?commentId=${commentId}`,{
                method : "PUT",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    comment
                })
            });

            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }

            setComment(responseData.data);
        }
        catch(error){
            toast.error(error.message, {
                position : "top-center",
                autoClose : 5000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,   
            });
        }
        finally{
            setEditCommentLoading(false);
        }
    }

    return {editCommentLoading, updateComment};
}

export default useEditComment;