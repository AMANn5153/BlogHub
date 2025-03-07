import useAuthContext from "../context/authContext/useAuthContext";
const useAuthFetch = () => {

    const {setAuth} = useAuthContext();

    const authFetch = async(apiUrl, options={}) =>{
        
        let accessTokenResponse = await fetch(`http://localhost:3001/api/v1/auth/checkAccessToken`,{
            method : "GET",
            credentials : "include",
        });

        if(!accessTokenResponse.ok){
            sessionStorage.removeItem("user");
            setAuth(null);
           
        }else{
            const responseData = await accessTokenResponse.json();
            sessionStorage.setItem("user", JSON.stringify(responseData.user));
            setAuth(responseData.user);
        }

        let response = await fetch(apiUrl, options);        
        return response;
    }
    return {authFetch};
}

export default useAuthFetch;