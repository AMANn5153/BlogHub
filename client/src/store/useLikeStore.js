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
        set((state)=>({likes : [...like, ...state.likes]}))
    },
    unSetLike:({blogId, userId})=>{
        set((state)=>{
            return { likes : state.likes.filter((like)=>like.blogId !== blogId && like.userId !== userId) };
        })
    },

    setCommentLike:(likes)=>{
        set((state)=>({CommentLike : [...likes, ...state.CommentLike]}))
    },
    unSetCommentLike:({commentId, userId})=>{
        set((state)=>{
           return {CommentLike : state.CommentLike.filter((like)=>like.commentId !== commentId || like.userId !== userId)}
        })
    },

}));

export default useLikeStore;