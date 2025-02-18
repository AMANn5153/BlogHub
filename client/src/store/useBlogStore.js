import { TbNumber0Small } from "react-icons/tb";
import { create } from "zustand";

const useBlogStore = create((set) => ({
    blogs : null,
    blog : null,

    setSingleBlog : (blog)=>{
        set((state)=>({
             blog 
        }))
    },
    setBlog:(blogs)=>{
        set((state)=>({
            blogs : blogs
        }))
    },
    setLikes : (likes)=>{
        set({likes})
    },

    setAllBlogs : (blogs)=>{
        set((state)=>{
            return {blogs : [...blogs]}
        })
    }
}));

export default useBlogStore;