import {useEffect, useState}  from "react";
import useAuthFetch from "../../utils/authFetch";
import useAnalyticsStore from "../../store/useAnalyticsStore";
import { toast } from "react-toastify";

const useGetLineChartData = (blogID, period) => {
    const [isWeeklyLoading, setWeeklyLoading] = useState(false);
    const {setLike, setView, setComments} = useAnalyticsStore();
    
    const {authFetch} = useAuthFetch();
    useEffect(()=>{
        const getWeeklyStats = async() => {
            setWeeklyLoading(true);
            try{
                const response = await authFetch(`http://localhost:3001/api/v1/analytics/stats?blogID=${blogID}&period=${period}`, {
                    method : "GET",
                    headers:{
                        "content-type" : "application/json",
                    }
                });

                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message);
                }

                setLike(responseData.likes);
                setView(responseData.views);
                setComments(responseData.comments);

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
    },[blogID, period]);

    return {isWeeklyLoading};
}


export default useGetLineChartData;