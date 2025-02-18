import {useEffect, useState} from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";   
import useBlogStore from "../../store/useBlogStore";
const useGetAllBlogsOfUser = (_id = null) => {
    const {auth} = useAuthContext();
    const {authFetch} = useAuthFetch();
    const {setAllBlogs} = useBlogStore();
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        const getAllBlogsOfUser = async()=>{
            try{
                setLoading(true);
                const response = await authFetch(`http://localhost:3001/api/v1/blog/blogOfUser?_id=${_id}`, {
                    method : "GET",
                    headers:{
                        "content-type" : "application/json",
                    }
                });

                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message);
                }

                setAllBlogs(responseData.data);
            }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);  
        }
    }
    getAllBlogsOfUser();    
    },[auth?._id]);
    return {isLoading};
} 

export default useGetAllBlogsOfUser
                