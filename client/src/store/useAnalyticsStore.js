import { create } from "zustand";

const useAnalyticsStore = create((set)=>({
    totalAnalytics: {},
    likeWeekly : [],
    viewWeekly : [],
    commentsWeekly : [],
    
    setTotalAnalytics : (stats)=>{
        set((state)=>{
            return {totalAnalytics : {...stats}}
    });
    },

    setLikeWeekly : (stats)=>{
        set((state)=>{
            return {likeWeekly: [...stats]}
        })
    },

    setViewWeekly : (stats)=>{
        set((state)=>{
            return {viewWeekly : [...stats]}
        })
    },

    setCommentsWeekly : (stats)=>{
        set((state)=>{
            return {commentsWeekly : [...stats]}
        })
    }
}));


export default useAnalyticsStore;