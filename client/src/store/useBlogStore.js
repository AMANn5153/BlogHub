import { create } from "zustand";

const useBlogStore = create((set) => ({
    blogs : [],
    setBlog:(blogs)=>{
        set({blogs})
    }
}));

export default useBlogStore;