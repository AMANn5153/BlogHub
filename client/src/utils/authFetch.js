import useAuthContext from "../context/authContext/useAuthContext";

const useAuthFetch = () => {

    const {setAuth} = useAuthContext();

    const authFetch = async(apiUrl, options={}) =>{
        
        let accessTokenResponse = await fetch(`http://localhost:3001/api/v1/auth/checkAccessToken`,{
            method : "GET",
            credentials : "include",
        });

        if(!accessTokenResponse.ok){
            localStorage.removeItem("user");
            setAuth(null);
            return;
        }else{
            const responseData = await accessTokenResponse.json();
            localStorage.setItem("user", JSON.stringify(responseData.data));
            setAuth(responseData.data);
        }

        let response = await fetch(apiUrl, options);        
        return response;
    }
    return {authFetch};
}

export default useAuthFetch;