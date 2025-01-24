import { create } from "zustand";

const useLikeStore = create((set) => ({
    likes : [],
    setLike:(likes)=>{
        set((state)=>({likes : [...likes, ...state.likes]}))
    },
    unSetLike:({blogId, userId})=>{
        set((state)=>{
            const likeIndex = state.likes.findIndex((like)=>like.blogId === blogId && like.userId === userId);
            return {likes : [...state.likes.slice(0, likeIndex), ...state.likes.slice(likeIndex + 1)]}
        })
    }

}));

export default useLikeStore;