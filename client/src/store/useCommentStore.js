import { create } from "zustand";

const useCommentStore = create((set) => ({
    comments : [],
    setNewComment:(newComments)=>{
        set((state)=>({comments:[...newComments, ...state.comments]}));
    },
    setComment:(newComments)=>{
        set((state)=>({comments :[...newComments]}))
    }
}));

export default useCommentStore;