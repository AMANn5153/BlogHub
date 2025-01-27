import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import useAuthContext from "../../context/authContext/useAuthContext"

const Dashboard = () => {
    const {auth} = useAuthContext();

  return (
    <div className = "grid  grid-rows-[2fr_2fr_4fr]">
        <div className="grid-rows-1 flex flex-row justify-start">
            <h1 className="text-6xl font-bold">Hello {auth.name}</h1>
        </div>
        <div className="grid-rows-2 flex flex-row items-start justify-between">
            <div className = "border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
                <h1 className="text-6xl font-bold">1</h1>
                <h1 className="text-2xl font-bold">Total Posts</h1>
            </div>
            <div className = "border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
                <h1 className="text-6xl font-bold">1</h1>
                <h1 className="text-2xl font-bold">Total Likes</h1>
            </div>
            <div className = "border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
                <h1 className="text-6xl font-bold">100</h1>
                <h1 className="text-2xl font-bold">Total Views</h1>
            </div>
        </div>
        <div className=" flex flex-row border border-white gap-4">
            <div className="border border-red-400">
                <li>followers</li>
                <li></li>
                <li></li>
            </div>
            <div className=" ">
                <h1>Posts</h1>
                <PostCards/>
            </div>
        </div>
    </div>
  )

}


const PostCards = () => {
    return (
        <>
            <div className = "flex flex-cols items-start justify-between" >
                <div>
                    <h1>HEAding</h1>
                    <h1>subHeainf</h1>
                </div>
                <div className="flex flex-row">
                    <div><FaHeart/></div>
                    <div><FaComment/></div>
                    <div><FaEye/></div>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

export default Dashboard