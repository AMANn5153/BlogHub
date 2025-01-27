import { useEffect, useState } from "react";
import useLikeStore from "../../store/useLikeStore";
import useSaveStore from "../../store/useSaveStore";
import { toast } from "react-toastify";

const useGetBlog = (id) => {

    const [loading, setLoading] = useState(false);
    const {initialBlogLikes} = useLikeStore();
    const {initialSaveBlog} = useSaveStore();
    const [blog, setBlog] = useState();

    useEffect(() => {
        const getBlog = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/v1/blog/getBlog?id=${id}`, {
                    method: "GET",
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message || "Failed to fetch the blog.");
                }
                setBlog(responseData.data);
                initialBlogLikes(responseData.likes);
                initialSaveBlog(responseData.saves);

            } catch (error) {
                console.log(error);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setLoading(false);
            }
        }
        
        getBlog();

    }, [id, setBlog]); 

    return {blog, loading };

};

export default useGetBlog;
