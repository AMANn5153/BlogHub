import useAuthContext from "../context/authContext/useAuthContext";

const useRefreshToken = () =>{
    const {setAuth} = useAuthContext();
    const refreshToken = async () => {
        try{
            const response = await fetch(`http://localhost:3001/api/v1/auth/refreshToken`, {
                method : "GET",
                credentials : "include",
            });
            if(!response.ok){
                localStorage.removeItem("user");
                setAuth(null);
            }
        }
        catch(error){
            console.log(error);
        }
    
    }
    return {refreshToken};
}



const useAuthFetch = () => {
    const {refreshToken} = useRefreshToken();
    const authFetch = async(apiUrl, options={}) =>{

        let cloneBody = null;
        
        if(options.body && ['POST', 'PUT', 'PATCH'].includes(options.method)){
            cloneBody = options.body instanceof FormData ? options.body : options.body;
        }
        
        options.credentials = "include";

        let response = await fetch (apiUrl, options);        

        if(response.status === 401){
            await refreshToken();
        }
        else{
            return response;
        }

        options.credentials = "include";

        options.body = cloneBody;

        response = await fetch(apiUrl, options);

        return response;
    }
    return {authFetch};
}

export default useAuthFetch;