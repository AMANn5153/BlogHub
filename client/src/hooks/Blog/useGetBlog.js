import { useEffect, useState } from "react";
import useLikeStore from "../../store/useLikeStore";
import useSaveStore from "../../store/useSaveStore";
import { toast } from "react-toastify";
import useBlogStore from "../../store/useBlogStore";

const useGetBlog = (id) => {

    const [loading, setLoading] = useState(false);
    const {initialBlogLikes} = useLikeStore();
    const {initialSaveBlog} = useSaveStore();
    const {setSingleBlog} = useBlogStore();

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
                console.log(responseData);
                setSingleBlog(responseData.data);
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

    }, [id, setSingleBlog]); 

    return {loading };

};

export default useGetBlog;
