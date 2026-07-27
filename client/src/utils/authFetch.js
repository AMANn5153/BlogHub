import useAuthContext from "../context/authContext/useAuthContext";

const useAuthFetch = () => {
    const {setAuth, setToken} = useAuthContext();

    const authFetch = async(apiUrl, options={}) =>{
        
        let accessTokenResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/checkAccessToken`,{
            method : "GET",
            credentials : "include",
        });

        if(!accessTokenResponse.ok){
            sessionStorage.removeItem("token");
            setAuth(null);  
            setToken(undefined);      
        }else{
            const responseData = await accessTokenResponse.json();
            // sessionStorage.setItem("user", JSON.stringify(responseData.user));
            // setAuth(responseData.user);
        }

        let response = await fetch(apiUrl, options);        
        return response;
    }
    return {authFetch};
}

export default useAuthFetch;