import {useState} from "react";
import { toast } from "react-toastify";
import useAuthFetch from "../../utils/authFetch";
import useAuthContext from "../../context/authContext/useAuthContext";
import { useNavigate } from "react-router-dom";

const useUpdateUser = ()=>{
    const [updateUserLoading, setUpdateUserLoading] = useState(false);
    const {authFetch} = useAuthFetch();
    const {setAuth} = useAuthContext();
    const navigate = useNavigate();
    const updateUser = async(userData) =>{
        const {
            name,
            username,
            email,
            bio,
            website,
            work,
            location,
            education, 
            profilePic
        } = userData;

        const fm = new FormData();

        fm.append("name", name);
        fm.append("username", username);
        fm.append("email", email);
        fm.append("bio", bio);
        fm.append("website", website);
        fm.append("workingAt", work);
        fm.append("location", location);
        fm.append("education", education);
        if(profilePic){
            fm.append("profilePic", profilePic);
        }

        try{
            setUpdateUserLoading(true);
            const response = await authFetch(`${process.env.REACT_APP_API_URL}/setting/updateUserInfo`, {
                method: "PUT",
                body: fm,
                credentials:"include",      
            });
            const responseData = await response.json();
            
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setAuth(responseData.data);
            toast.success("Profile updated successfully");
            navigate(`/profile/${responseData.data._id}`);
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
        finally{
            setUpdateUserLoading(false);
        }
    }

    return {updateUser, updateUserLoading};
}

export default useUpdateUser;