import useAuthFetch from "../../utils/authFetch";
import { toast } from "react-toastify";
import { useState } from "react";
import useSubscriberStore from "../../store/useSubscriberStore";

const useSubscribe = () => {
    const {authFetch} = useAuthFetch();
    const [subscribeLoading, setSubscribeLoading] = useState(false);
    const {addSubscriber, removeSubscriber} = useSubscriberStore();

    const subscribe =async (authorID) => {
       try {
         setSubscribeLoading(true);     
         const response = await authFetch(`http://localhost:3001/api/v1/subscribe/addSubscriber?authorID=${authorID}`, {
             method: "POST",
             credentials:"include",
             headers: {
                 "Content-Type": "application/json",
             },
         });

         const responseData = await response.json();
        
         if(!response.ok){
            throw new Error(responseData.message);
         }
         
         if(responseData.data.length === 0){
            removeSubscriber(authorID);
         }
         addSubscriber(responseData.data);

       } catch (error) {
         console.log(error);
         toast.error(error.message, {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: true,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
         });
       }
       finally{
        setSubscribeLoading(false);}
    };

    return {subscribeLoading, subscribe};
}   

export default useSubscribe;