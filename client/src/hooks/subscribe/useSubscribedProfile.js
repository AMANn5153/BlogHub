import useAuthContext from "../../context/authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";
import { useState, useEffect } from "react";
import useSubscriberStore from "../../store/useSubscriberStore";



const useSubscribedProfile = (_id) => {
    const [subscribedProfile, setSubscribedProfile] = useState(null);
    const [isSubProfileLoading, setSubscribedProfileLoading] = useState(false);
    const {authFetch} = useAuthFetch();
    const {subscribers} = useSubscriberStore();

    useEffect(() => {
       const getSubscribedProfile = async () => {
           try {
                setSubscribedProfileLoading(true);
               const response = await authFetch(`${process.env.REACT_APP_API_URL}/subscribe/getSubscribedProfile?_id=${_id}`, {
                   method: "GET",
               });

               const responseData = await response.json();

               if(!response.ok){
                   throw new Error(responseData.message);
               }

               setSubscribedProfile(responseData.data);

           } catch (error) {
               console.log(error);
           }
           finally{
                setSubscribedProfileLoading(false);
           }
       }

       getSubscribedProfile(); 
    },[_id]);

    return {subscribedProfile, isSubProfileLoading};
}

export default useSubscribedProfile;