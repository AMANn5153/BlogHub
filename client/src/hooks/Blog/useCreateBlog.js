import { useState } from "react";
import useBlogStore from "../../store/useBlogStore";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";
import authFetch from "../../utils/authFetch";

const useCreateBlog = ()=>{
    const[loading, setLoading] = useState(false);
    const {auth} = useAuthContext();
    const {setBlog} = useBlogStore();

    const createBlog = async({author,coverImage, title, content, status}) =>{
        setLoading(true);
        if(!checkFields({author,title, content, coverImage, status})){
            setLoading(false);
            return;
        }
        try {
            const response = await authFetch(`http://localhost:3001/api/v1/blog/newBlog`,{
                method : "POST",
                Credentials : "include",
                headers:{
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({author, title, content, coverImage, status})
            });
    
            const responseData = await response.json();
    
            if(!response.ok){
                throw new Error(responseData.message);
            }

            setBlog(responseData.data);

        } catch (error) {
            console.log(`error in initialization of blog`,error.message);
            toast.error(error.message,{
                position : "top-right",
                autoClose : 5000,
                hideProgressBar : true,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,
            })
        }
        finally{
            setLoading(false);
        }
    }

    return {createBlog, loading};

}


    const checkFields = ({author, title, content, coverImage, status}) =>{
        if(!title || !content || !coverImage || !status){
            toast.error("some fields are missing", {
                position : "top-right",
                autoClose : 2000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                theme : "dark",
            });
            return false;
            }
            return true;
    }

export default useCreateBlog;