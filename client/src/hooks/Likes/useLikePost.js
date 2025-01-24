import { useState } from "react";
import useLikeStore from "../../store/useLikeStore";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";

const useLikePost = () => {
    const [likePostLoading, setLikePostLoading] = useState(false);
    const {setLike, unSetLike} = useLikeStore();
    const {auth} = useAuthContext();


    const likePost = async (blogId)=>{
        try{
            setLikePostLoading(true);
            const response = await fetch(`http://localhost:3001/api/v1/like/toggleBlogLike?blogId=${blogId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message || "Error in posting comment");
            }


            if(responseData.data.length === 0){
               unSetLike({blogId, userId : auth._id});
            }else{
             setLike([responseData.data]);
            }
            
        }
        catch(err){
            console.log(err);
        }   
        finally{
            setLikePostLoading(false);
        }
    }

    return {likePost, likePostLoading};
}


export default useLikePost;