import { create } from "zustand";

const useAnalyticsStore = create((set)=>({
    totalAnalytics: {},
    setTotalAnalytics : (stats)=>{
        set((state)=>{
            return {totalAnalytics : {...stats}}
    });
    }
}));


export default useAnalyticsStore;