import { useState, useEffect } from "react";
import useCommentStore from "../../store/useCommentStore";

const useGetCommentThread = ({id}) => {
    const [commentThreadLoading, setCommentThreadLoading] = useState(true);
    const {setComment} = useCommentStore();

    useEffect(()=>{
        const getComments = async ()=>{
            try{
                setCommentThreadLoading(true);
                const response = await fetch(`http://localhost:3001/api/v1/comment/getCommentThread?commentId=${id}`, {
                    method: "GET",
                });
                
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message || "Failed to fetch the comments");
                }
                setComment(responseData.comments);
            }
            catch(error){
                console.log(error);

            }
            finally{
                setCommentThreadLoading(false);
            }
        }    
        
        getComments();
    }, [id]);

    return {commentThreadLoading}
}

export default useGetCommentThread;