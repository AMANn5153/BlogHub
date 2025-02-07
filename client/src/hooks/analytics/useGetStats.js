import {useEffect, useState} from "react";
import useAnalytics from "../../store/useAnalyticsStore";
import useAuthFetch from "../../utils/authFetch";

const useGetStats = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const {authFetch} = useAuthFetch();
    const {setTotalAnalytics} = useAnalytics();
    useEffect(()=>{
    const getStats = async()=>{
        try{
            setIsLoading(true);
            const response = await authFetch(`http://localhost:3001/api/v1/analytics/getLikesAndViewsAndSaves`,{
                method : "GET",
                credentials : "include",
            });

            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message);
            }

            setTotalAnalytics({likes : responseData.totalLikes, comments : responseData.totalComments, views : responseData.totalViews})
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }

    getStats();
},[]);

    return { isLoading};
}


export default useGetStats;