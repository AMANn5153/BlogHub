import {create} from "zustand";
const useProfile = create((set)=>({
    profile : null,
    setProfile : (profile)=>{
        set(() => ({
            profile
        }))
    }
})
)

export default useProfile;