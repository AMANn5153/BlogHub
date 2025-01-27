import { create } from "zustand";

const useBlogStore = create((set) => ({
    blogs : [],
    setBlog:(blogs)=>{
        set({blogs})
    },
    setLikes : (likes)=>{
        set({likes})
    }
}));

export default useBlogStore;