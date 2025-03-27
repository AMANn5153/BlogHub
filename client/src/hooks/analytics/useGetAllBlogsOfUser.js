import {useEffect, useState} from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";   
import useBlogStore from "../../store/useBlogStore";
const useGetAllBlogsOfUser = (_id = null) => {
    const {authFetch} = useAuthFetch();
    const {setAllBlogs} = useBlogStore();
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        if(!_id)return;
        const getAllBlogsOfUser = async()=>{
            try{
                setLoading(true);
                const response = await authFetch(`${process.env.REACT_APP_API_URL}/blog/blogOfUser?_id=${_id}`, {
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
    },[ _id]);
    return {isLoading};
} 

export default useGetAllBlogsOfUser
                