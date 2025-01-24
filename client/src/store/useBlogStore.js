import { create } from "zustand";

const useBlogStore = create((set) => ({
    blogs : [],
    likes : 0,
    setBlog:(blogs)=>{
        set({blogs})
    },
    setLikes : (likes)=>{
        set({likes})
    }
}));

export default useBlogStore;