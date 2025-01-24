import { useState } from 'react';
import { toast } from "react-toastify";
import useCommentStore from '../../store/useCommentStore';

const usePostComment = () => {
    const [commentPostLoading, commentPostSetLoading] = useState(false);
    const { setComment, comments } = useCommentStore();

    const postComment = async ({ comment, blogId }) => {
        try {
            if(comment === "<p></p>"){
                throw new Error("empty comment is not allowed");
            }

            commentPostSetLoading(true);

            const response = await fetch(`http://localhost:3001/api/v1/comment/newComment?id=${blogId}`, {
                method: "POST", 
                credentials: "include",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ comment }) 
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Error in posting comment");
            }

            // Functional update to avoid stale state issues
            setComment([responseData.data]);

        } catch (err) {
            console.log(err.message);
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            commentPostSetLoading(false);
        }
    };

    return { postComment, commentPostLoading };
};

export default usePostComment;
