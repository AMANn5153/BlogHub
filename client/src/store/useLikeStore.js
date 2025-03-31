import { create } from "zustand";

const useLikeStore = create((set) => ({
    likes : [],
    CommentLike :[],

    initialBlogLikes : (likes)=>{
        set((state)=>({likes : [...likes]}))
    },

    initialCommentLikes : (likes)=>{
        set((state)=>({CommentLike : [...state.CommentLike,...likes]}))
    },
    setLike:(like)=>{
        set((state)=>{
            return {likes : [...like, ...state.likes]}
        })
    },
    unSetLike:({blogId, userId})=>{
        set((state)=>{
            const index = state.likes.findIndex((like)=>like.blogId === blogId && like.userId === userId);
            return {likes : [...state.likes.slice(0, index), ...state.likes.slice(index + 1)]}
        })
    },

    setCommentLike:(likes)=>{
        set((state)=>({CommentLike : [...likes, ...state.CommentLike]}))
    },
    unSetCommentLike:({commentId, userId})=>{
        set((state)=>{
            const index = state.CommentLike.findIndex((like)=>like.commentId === commentId && like.userId === userId);
            return {CommentLike : [...state.CommentLike.slice(0, index), ...state.CommentLike.slice(index + 1)]}
        })
    },

}));

export default useLikeStore;