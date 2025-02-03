
const refreshToken = async () => {
    
    try{
        const response = await fetch(`http://localhost:3001/api/v1/auth/refreshToken`, {
            method : "GET",
            credentials : "include",
        });
        if(!response.ok){
            throw new Error("token expired");
        }
    }
    catch(error){
        console.log(error);
    }

}


const authFetch = async(apiUrl, options={}) =>{

    console.log(options);

    let cloneBody = null;
    
    if(options.body && ['POST', 'PUT', 'PATCH'].includes(options.method)){
        cloneBody = options.body instanceof FormData ? new FormData(options.body) : options.body;
    }

    options.credentials = "include";

    let response = await fetch (apiUrl, options);

    console.log(response);

    if(response.status === 401){
        await refreshToken();
    }

    options.credentials = "include";

    options.body = cloneBody;

    response = await fetch(apiUrl, options);

    return response;
}


export default authFetch;