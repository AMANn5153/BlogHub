import {useEffect, useState}  from "react";
import useAuthFetch from "../../utils/authFetch";
import useAnalyticsStore from "../../store/useAnalyticsStore";
import { toast } from "react-toastify";

const useGetWeeklyStats = (blogID) => {
    const [isWeeklyLoading, setWeeklyLoading] = useState(false);
    const {setLikeWeekly, setViewWeekly, setCommentsWeekly} = useAnalyticsStore();
    
    const {authFetch} = useAuthFetch();
    useEffect(()=>{
        const getWeeklyStats = async() => {
            setWeeklyLoading(true);
            try{
                const response = await authFetch(`http://localhost:3001/api/v1/analytics/getLikeWeeklyStats?blogID=${blogID}`, {
                    method : "GET",
                    headers:{
                        "content-type" : "application/json",
                    }
                });

                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message);
                }

                setLikeWeekly(responseData.weeklyLikes);
                setViewWeekly(responseData.weeklyViews);
                setCommentsWeekly(responseData.weeklyComments);

            }
            catch(error){
                console.log(error);
                toast.error(error.message, {
                    position : "top-center",
                    autoClose : 5000,
                    hideProgressBar : false,
                    closeOnClick : true,
                    pauseOnHover : true,
                    draggable : true,
                    progress : undefined,   
                });
            }
            finally{
                setWeeklyLoading(false);
            }
        }
        getWeeklyStats();
    },[blogID]);

    return {isWeeklyLoading};
}


export default useGetWeeklyStats;