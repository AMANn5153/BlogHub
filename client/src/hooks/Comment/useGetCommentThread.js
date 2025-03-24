import { useState, useEffect } from "react";
import useCommentStore from "../../store/useCommentStore";
import useLikeStore from "../../store/useLikeStore";
import useAuthFetch from "../../utils/authFetch";

const useGetCommentThread = ({commentSlug}) => {
    const [commentThreadLoading, setCommentThreadLoading] = useState(true);
    const {setComment} = useCommentStore();
    const {initialCommentLikes} = useLikeStore();
    const {authFetch} = useAuthFetch();

    useEffect(()=>{
        const getComments = async ()=>{
            try{
                setCommentThreadLoading(true);
                const response = await authFetch(`http://localhost:3001/api/v1/comment/getCommentThread?commentSlug=${commentSlug}`, {
                    method: "GET",
                });
                
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message || "Failed to fetch the comments");
                }
                setComment(responseData.comments);
                
                initialCommentLikes(responseData.likes);
            }
            catch(error){
                console.log(error);

            }
            finally{
                setCommentThreadLoading(false);
            }
        }    
        
        getComments();
    }, [commentSlug]);

    return {commentThreadLoading}
}

export default useGetCommentThread;