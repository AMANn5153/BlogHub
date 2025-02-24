import { create } from "zustand";

const useAnalyticsStore = create((set)=>({
    totalAnalytics: {},
    like : [],
    view : [],
    comment : [],
    
    setTotalAnalytics : (stats)=>{
        set((state)=>{
            return {totalAnalytics : {...stats}}
    });
    },

    setLike : (stats)=>{
        set((state)=>{
            return {like: [...stats]}
        })
    },

    setView : (stats)=>{
        set((state)=>{
            return {view: [...stats]}
        })
    },

    setComments : (stats)=>{
        set((state)=>{
            return {comment : [...stats]}
        })
    }
}));


export default useAnalyticsStore;