import { create } from "zustand";

const useLikeStore = create((set) => ({
    likes : [],
    CommentLike : [],

    initialBlogLikes : (likes)=>{
        set((state)=>({likes : [...likes]}))
    },

    initialCommentLikes : (likes)=>{
        set((state)=>({CommentLike : [...likes]}))
    },
    setLike:(likes)=>{
        set((state)=>({likes : [...likes, ...state.likes]}))
    },
    unSetLike:({blogId, userId})=>{
        set((state)=>{
            const likeIndex = state.likes.findIndex((like)=>like.blogId === blogId && like.userId === userId);
            return {likes : [...state.likes.slice(0, likeIndex), ...state.likes.slice(likeIndex + 1)]}
        })
    },

    setCommentLike:(likes)=>{
        set((state)=>({CommentLike : [...likes, ...state.CommentLike]}))
    },
    unSetCommentLike:({commentId, userId})=>{
        set((state)=>{
            const likeIndex = state.CommentLike.findIndex((like)=>like.commentId === commentId && like.userId === userId);
            return {CommentLike : [...state.CommentLike.slice(0, likeIndex), ...state.CommentLike.slice(likeIndex + 1)]}
        })
    },

}));

export default useLikeStore;