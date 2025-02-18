import { useParams } from "react-router-dom";
import useAuthContext from "../../context/authContext/useAuthContext";
import Tabs from "../../components/Tabs/Tabs";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";
import useBlogStore from "../../store/useBlogStore";
import useUser from "../../hooks/user/useUser";
import useProfile from "../../store/useProfile";
import { CiFilter } from "react-icons/ci";

const Profile = () => {
    const {auth} = useAuthContext();
    const {id:_id} = useParams();
    useUser(_id);
    const {isLoading : blogsLoading} = useGetAllBlogsOfUser(_id);
    const {blogs} = useBlogStore(); 
    const {profile} = useProfile();

    
  return (
    <div className = "grid bg-white grid-cols-[4fr_2fr]">
      <div className = "flex w-full  flex-col gap-5 items-start">
      <h1 className = "text-6xl m-10 w-full font-bold text-black">{profile?.name}</h1>
      <div className="w-full"> 
        <Tabs blogs={blogs}/> 
      </div>
      </div>
      <div className=" flex h-screen flex-col sticky top-0 right-0 w-full h-full justify-start items-center bg-white">
        <div className = "flex p-10 w-full h-1/2 flex-col gap-3 items-start ">
            <div className = "rounded-full w-20 h-20 bg-white">
                <img src={profile?.profilePic} alt="profile pic" className="rounded-full w-20 h-20"/>
            </div>
            <div className = "text-gray-600">
              <p>1.7K followers</p>
            </div>
            <div className = "text-gray-600">
              <p>Creative Developer, Generative AI| JavaScript, HTML, CSS</p>
            </div>
            <div>
             {auth._id !== profile?._id ? <button className="btn bg-blue-950 text-white btn-sm">Follow</button>
            :<button className="btn bg-blue-950 text-white btn-sm">Edit</button>
            }
            </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-1/2 bg-white p-10">
          <h2 className="text-xl font-bold text-gray-800">Following</h2>
        </div>
      </div>
    </div>
  )
}

export default Profile