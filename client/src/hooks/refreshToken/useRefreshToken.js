const useRefreshToken = () => {
    
    const refreshToken = async () => {
       try {
        const res = await fetch(`http://localhost:3001/api/v1/auth/refreshToken`,{
            method : "GET",
            credentials : "include",
        });

        const data = await res.json();

        if(!res.ok){
            return data.accessToken;
        }
        return data.accessToken;
    
     
       } catch (error) {
         console.log(error);
       }
    }

    return {refreshToken};

}


export default useRefreshToken;