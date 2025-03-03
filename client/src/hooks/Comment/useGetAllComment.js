import { useEffect, useState } from "react";
import useCommentStore from "../../store/useCommentStore";
import {toast} from "react-toastify";
import useLikeStore from "../../store/useLikeStore";

const useGetAllComment = (blogId) =>{
    const  {setComment} = useCommentStore();
    const  {initialCommentLikes} = useLikeStore();
    const [commentLoading, setCommentLoading] = useState(false);
    
    useEffect(()=>{
        const getComments = async () => {
            try{
                setCommentLoading(true);
                const response = await fetch(`http://localhost:3001/api/v1/comment/getComments?blogId=${blogId}`, {
                    method: "GET",
                });
                
                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message || "Failed to fetch the comments");
                }
                setComment(responseData.data);
                initialCommentLikes(responseData.likes);
            
                
            }
            catch(error){
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
            }
            finally{
                setCommentLoading(false);
            }
        }
        getComments();
    }
    ,[blogId]);
    
    return { commentLoading};
}

export default useGetAllComment;