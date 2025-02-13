import useAuthFetch from "../../utils/authFetch";

const useSubscribe = () => {
    const {authFetch} = useAuthFetch();
    const subscribe = () => {
        const response = await fetch(`http://localhost:3001/api/v1/subscribe`, {
            method : "POST",
            headers:{
                "content-type" : "application/json",
            }

        });

    }
}   

export default useSubscribe;