import { useState, useEffect } from "react";
import useBlogStore from "../../store/useBlogStore";
import { toast } from "react-toastify";
import useAuthFetch from "../../utils/authFetch";

const useGetAllBlog = (filter = null, page) => {
    const [loading, setLoading] = useState(false);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const {blogs, setBlog} = useBlogStore();
    const {authFetch} = useAuthFetch();
   
    
    useEffect(()=>{
        const getBlog = async ()=>{
            try{
                setLoading(true);
                const response = await authFetch(`${process.env.REACT_APP_API_URL}/blog/getAllBlog?filter=${filter}&page=${page}`);
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setBlog(responseData.data);
                setTotalDocuments(responseData.totalDocuments);
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
    [setBlog, filter, page]);

    return {blogs, loading, totalDocuments};

}


export default useGetAllBlog;