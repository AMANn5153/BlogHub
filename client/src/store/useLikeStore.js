import { create } from "zustand";

const useLikeStore = create((set) => ({
    likes : [],
    setLike:(likes)=>{
        set({likes})
    }
}));