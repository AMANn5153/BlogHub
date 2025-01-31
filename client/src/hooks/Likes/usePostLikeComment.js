import { useState } from "react";
import useLikeStore from "../../store/useLikeStore";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";

const useLikePostComment = () => {
    const [likePostLoading, setLikePostLoading] = useState(false);
    const {setCommentLike, unSetCommentLike} = useLikeStore();
    const {auth} = useAuthContext();


    const likePostComment = async (commentId)=>{
        try{
            setLikePostLoading(true);
            const response = await fetch(`http://localhost:3001/api/v1/like/toggleCommentLike?commentId=${commentId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Authorization' : `Bearer ${auth}`,
                    "Content-Type": "application/json",
                },
            });
            
            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message || "Error in posting comment");
            }


            if(responseData.data.length === 0){
               unSetCommentLike({commentId, userId : auth._id});
            }else{
             setCommentLike([responseData.data]);
            }
            
        }
        catch(err){
            console.log(err);
        }   
        finally{
            setLikePostLoading(false);
        }
    }

    return {likePostComment, likePostLoading};
}


export default useLikePostComment;