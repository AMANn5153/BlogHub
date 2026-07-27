import { useState } from "react";
import useAuthFetch from "../../utils/authFetch";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import useCommentStore from "../../store/useCommentStore";

const useDeleteComment = () => {
    const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
    const {authFetch} = useAuthFetch();
    const navigate = useNavigate();
    const {deleteCommentThread} = useCommentStore();
    const deleteComment = async (commentId) =>{
        setDeleteCommentLoading(true);
        try{
            const response = await authFetch(`${process.env.REACT_APP_API_URL}/comment/deleteComment?commentId=${commentId}`, {
                method : "DELETE",
                credentials : "include",
                headers : {
                    "content-type" : "application/json"
                }
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            deleteCommentThread(commentId);
            navigate(`/blog/${responseData.data}`);

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