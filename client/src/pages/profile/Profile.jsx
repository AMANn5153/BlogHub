import { useParams } from "react-router-dom";
import useAuthContext from "../../context/authContext/useAuthContext";
import Tabs from "../../components/Tabs/Tabs";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";
import useBlogStore from "../../store/useBlogStore";

const Profile = () => {
    const {id} = useParams();
    const {auth} = useAuthContext();
    const {isLoading : blogsLoading} = useGetAllBlogsOfUser();
    const {blogs} = useBlogStore(); 

    
  return (
    <div className = "grid bg-slate-200 grid-cols-[4fr_2fr] h-screen">
      <div className = "flex m-10 flex-col gap-5 items-start">
        <h1 className = "text-6xl font-bold text-black">{auth.name}</h1>
        <Tabs blogs={blogs}/>
      </div>
      <div className=" flex flex-col w-full h-full justify-start items-center bg-white">
        <div className = "flex p-10 w-full h-1/2 flex-col gap-3 items-start ">
            <div className = "rounded-full sticky w-20 h-20 bg-white">
                <img src={auth.profilePic} alt="profile pic" className="rounded-full w-20 h-20"/>
            </div>
            <div className = "text-gray-600">
              <p>1.7K followers</p>
            </div>
            <div className = "text-gray-600">
              <p>Creative Developer, Generative AI| JavaScript, HTML, CSS</p>
            </div>
            <div>
              <button className="btn bg-blue-950 text-white btn-sm">Follow</button>
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