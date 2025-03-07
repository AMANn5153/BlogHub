// import {useEffect, useState} from "react";
// import useAuthFetch from "../../utils/authFetch";
// import useAuthContext from "../../context/authContext/useAuthContext";

// const useFetchTokenDetails = (token) =>{

//     const {authFetch} = useAuthFetch();
//     const {auth, setAuth} = useAuthContext();
//     const [details, setDetails] = useState(null);
    
//     useEffect(()=>{
//         const getTokenDetails = async ()=>{
//            try {
//             const response = await fetch(`http://localhost:3001/api/v1/auth/getTokenDetails`,{
//                 method : "GET",
//                 credentials : "include",
//                 headers : {
//                     "Authorization" : `Bearer ${auth}`
//                 }
//             });

//             const responseData = await response.json();

//             sessionStorage.setItem("token", JSON.stringify(responseData.token));
//             setAuth(token);
//             details(responseData.user);

//             if(!response.ok){
//                 throw new Error(responseData.message);
//             }

//             setAuth(responseData.data);
//             }
//            catch(error){
//                console.log(error);
//            }
//         }

//         getTokenDetails();

//     },[]);
// }

// export default useFetchTokenDetails;
