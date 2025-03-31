import { create } from "zustand";

const useBlogStore = create((set) => ({
    blogs : [],
    blog : null,


    removeSingleBlog : (blogId)=>{
        set((state)=>{return (
            { blogs :state.blogs.filter((blog)=>blog._id !== blogId)}
        )}
        )
    },
   
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