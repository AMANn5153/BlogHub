import { useParams } from "react-router-dom";
import useAuthContext from "../../context/authContext/useAuthContext";
import Tabs from "../../components/Tabs/Tabs";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";
import useBlogStore from "../../store/useBlogStore";
import useUser from "../../hooks/user/useUser";
import useProfile from "../../store/useProfile";
import FollowButton from "../../components/Button/FollowButton";
import useSubscribedProfile from "../../hooks/subscribe/useSubscribedProfile";
import { Link } from "react-router-dom";
import EditButton from "../../components/Button/EditButton";

const Profile = () => {
    const {auth} = useAuthContext();
    const {id:_id} = useParams();
    const{isLoading} = useUser(_id);
    const {profile} = useProfile();
    const  {subscribedProfile, isSubProfileLoading} = useSubscribedProfile(_id);

    if(isLoading || !profile){
        return (
            <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        )
    }
    
  return (
    <div className = "grid bg-white grid-cols-[4fr_2fr]">
      <div className = "flex w-full  flex-col gap-5 items-start">
      <h1 className = "text-5xl m-10 w-full capitalize font-bold text-black">{profile?.name}</h1>
      <div className="w-full"> 
        <Tabs id={_id}/>
      </div>
      </div>
      <div className=" flex h-screen flex-col sticky top-0 right-0 w-full justify-start items-center bg-white">
        <div className = "flex p-10 w-full h-1/2 flex-col gap-3 items-start ">
            <div className = "rounded-full w-20 h-20 bg-white">
                <img src={profile?.profilePic} alt="profile pic" className="rounded-full w-20 h-20"/>
            </div>
            <div className = "text-gray-600">
              <p></p>
            </div>
            <div className = "text-gray-600">
              <p></p>
            </div>
            <div>
             {auth?._id !== profile?._id ? <FollowButton authorID={profile?._id}/>
            :<EditButton/>
            }
            </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-full h-1/2 bg-white p-10">
          <h2 className="text-xl font-bold text-gray-800">Following</h2>
          <div className="flex w-full flex-col gap-2">
            {subscribedProfile?.map((sub)=>(
              <div className=" flex w-full p-1 gap-2 shadow-md overflow-auto rounded-md bg-slate-300 items-center">
                <div className="rounded-full w-10 h-10 bg-white">
                  <img src={sub.profilePic} alt="profile pic" className="rounded-full w-10 h-10"/>
                </div>
                <div>
                <Link to={`/profile/${sub._id}`}>
                  <h1 className="text-gray-800 hover:underline hover:text-cyan-800">{sub.name}</h1>
                </Link>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile