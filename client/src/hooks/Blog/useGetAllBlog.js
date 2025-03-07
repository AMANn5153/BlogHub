import { useState, useEffect } from "react";
import useBlogStore from "../../store/useBlogStore";
import { toast } from "react-toastify";
import useAuthFetch from "../../utils/authFetch";

const useGetAllBlog = (filter = null) => {
    const [loading, setLoading] = useState(false);
    const {blogs, setBlog} = useBlogStore();
    const {authFetch} = useAuthFetch();
   
    
    useEffect(()=>{
        const getBlog = async ()=>{
            try{
                setLoading(true);
                const response = await authFetch(`http://localhost:3001/api/v1/blog/getAllBlog?filter=${filter}`);
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setBlog(responseData.data);
            }catch(error){
                console.log(error);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark",
                });
            }finally{
                setLoading(false);  
            }
        }
        getBlog();
    }, 
    [setBlog, filter]);

    return {blogs, loading};

}


export default useGetAllBlog;