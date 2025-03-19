import {useState, useEffect} from "react";
import useSubscriberStore from "../../store/useSubscriberStore";
import useAuthFetch from "../../utils/authFetch";
import { toast } from "react-toastify";
import useAuthContext from "../../context/authContext/useAuthContext";

const useGetSubscribed = (_id) =>{
    const {authFetch} = useAuthFetch();
    const {setSubscribed} = useSubscriberStore();
    const [isGetSubscribed, setIsGetSubscribed] = useState(false);
    const {auth} = useAuthContext();
    


    useEffect(()=>{
        if(!_id)return;
        const getSubscribed = async()=>{
            try{
                setIsGetSubscribed(true);
                const response = await authFetch(`http://localhost:3001/api/v1/subscribe/getSubscribed?_id=${_id}`,{
                    method: "GET",
                    credentials : "include",
                });

                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setSubscribed(responseData.data);

            }catch(e){
                console.log(e);
                toast.error(e,{
                    position : "top-right",
                    autoClose : 5000,
                    hideProgressBar : true,
                    closeOnClick : true,
                    pauseOnHover : true,
                });

            }
            finally{
                setIsGetSubscribed(false);
            }
        }

            getSubscribed();
        
    },[_id]);
    return {isGetSubscribed};
}


export default useGetSubscribed;