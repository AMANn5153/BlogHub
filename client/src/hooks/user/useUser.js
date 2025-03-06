import {useState, useEffect} from "react";
import { toast } from "react-toastify";
import useProfile from "../../store/useProfile";
import useAuthFetch from "../../utils/authFetch";
const useUser = (_id) => {
    const [isLoading, setIsLoading] = useState(false); 
    const {setProfile} = useProfile();
    const {authFetch} = useAuthFetch();

    useEffect(() => {
        const getUser = async () => {
            try {
                setIsLoading(true);
                const response = await authFetch(`http://localhost:3001/api/v1/profile/getProfile?_id=${_id}`,{
                    method: "GET",
                });
                const data = await response.json();
                if(!response.ok){
                    throw new Error(data.message);
                }
                setProfile(data.data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        getUser();
    }, [_id]);

    return {isLoading};
};

export default useUser;