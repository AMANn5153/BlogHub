import { useState } from "react";
import useAuthFetch from "../../utils/authFetch";
const useDeleteComment = () => {
    const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
    const {authFetch} = useAuthFetch();
    const {de}

    const deleteComment = async (commentId) =>{
        console.log(commentId);
        setDeleteCommentLoading(true);
        try{
            const response = await authFetch(`http://localhost:3001/api/v1/comment/deleteComment?commentId=${commentId}`, {
                method : "DELETE",
                headers : {
                    "content-type" : "application/json"
                }
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            deleteComment
        }
        catch(err){
            console.log(err);
            toast.error(err.message, {
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
            setDeleteCommentLoading(false);
        }
    }

    return {deleteComment, deleteCommentLoading};

}

export default useDeleteComment;