import {create} from 'zustand';

const useSaveStore = create((set) => ({
    saveBlog : [],

    initialSaveBlog : (save)=>{
        set((state)=>({saveBlog : [...save]}))
    },
    setSaveBlog : (save)=>{
        set((state)=>({saveBlog : [...state.saveBlog, save]}))
    },

    unSetSaveBlog : ({blogId, userId})=>{
        set((state)=>{
            const saveIndex = state.saveBlog.findIndex((save)=>save.blogId === blogId && save.userId === userId);
            return {saveBlog : [...state.saveBlog.slice(0, saveIndex), ...state.saveBlog.slice(saveIndex + 1)]}
        })
    },
}));

export default useSaveStore;