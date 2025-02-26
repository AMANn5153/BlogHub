import { create } from "zustand";

const useCommentStore = create((set) => ({
    comments: [],

    setNewComment: (newComments) => {
        set((state) => ({ comments: [...newComments, ...state.comments] }));
    },

    setComment: (newComments) => {
        set(() => ({ comments: [...newComments] }));
    },

    deleteCommentThread: (commentId)=>{
        set((state)=>{
            return {
                comments : state.comments.filter((comment)=>comment._id !== commentId)
            }
        })
    },

    setReply: (newReply) => {
        set((state) => {
            if (state.comments.length > 0) {
                return {
                    comments: [
                        {
                            ...state.comments[0],
                            replies: [newReply ,...(state.comments[0].replies || [])],
                        },
                    ],
                };
            }
            return state; // If no comments exist, return the current state
        });
    },
}));

export default useCommentStore;
