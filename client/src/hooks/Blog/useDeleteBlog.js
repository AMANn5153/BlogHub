import { useState } from "react";
import useAuthFetch from "../../utils/authFetch";
import { toast } from "react-toastify";
import useBlogStore from "../../store/useBlogStore";

const useDeleteBlog = () => {
    const {authFetch} = useAuthFetch();
    const {removeSingleBlog} = useBlogStore();
    const [isDeleteBlogLoading, setDeleteBlogLoading] = useState(false);

    const deleteBlog = async (blogId) => {
        try {
            setDeleteBlogLoading(true);
            const response = await authFetch(`${process.env.REACT_APP_API_URL}/blog/deleteBlog?blogId=${blogId}`, {
                method : "DELETE",
                credentials : "include",
                headers:{
                    "content-type" : "application/json",
                }
            });
    
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(response.message);
            }

            removeSingleBlog(blogId);
            toast.success(responseData.message);

        } catch (error) {
            toast.error(error.message, {
                position : "top-center",
                autoClose : 5000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,   
            });
        }
        finally{
            setDeleteBlogLoading(false);
        }
    }

    return {deleteBlog, isDeleteBlogLoading};
}


export default useDeleteBlog;