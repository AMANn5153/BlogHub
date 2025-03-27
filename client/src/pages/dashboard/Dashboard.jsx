import useAuthContext from "../../context/authContext/useAuthContext";
import {useState} from "react";
import useGetStats from "../../hooks/analytics/useGetStats";
import useAnalyticsStore from "../../store/useAnalyticsStore";
import ProfileCard from "../../components/Card/ProfileCard";

import { TfiStatsUp } from "react-icons/tfi";

import { SlOptions } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { HiOutlineEye } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import useBlogStore from "../../store/useBlogStore";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";
import { Link } from "react-router-dom";
import StatsCard from "../../components/Stats/StatsCard";
import CreateBlog from "../createBlog/CreateBlog";
import { useEditorStateContext } from "../../context/editorStateContext/EditorStateContext";
import useSubscribedProfile from "../../hooks/subscribe/useSubscribedProfile";
import CheckModal from "../../components/Modal/CheckModal";

const Dashboard = () => {
  const { auth } = useAuthContext();
  const { isLoading } = useGetStats();
  const { totalAnalytics } = useAnalyticsStore();
  const { isLoading: blogsLoading } = useGetAllBlogsOfUser(auth?._id);
  const { blogs } = useBlogStore();
  const [active, setActive] = useState("posts");

  return (
    <div className="m-4 grid grid-rows-[2fr_2fr] gap-4">
      <div className=" grid-rows-1 flex flex-row justify-start">
        <h1 className="text-6xl font-bold">Hello {auth?.name}</h1>
      </div>
      <div className="w-full">
        {!isLoading ? (
          <StatsCard totalAnalytics={totalAnalytics} />
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-[4fr_12fr]">
        <div className="flex flex-col sticky h-screen left-0 top-20 items-center justify-start gap-1">
          <button onClick={()=>setActive("posts")} className={` ${active === 
            "posts" ? "bg-blue-800 text-white" : ""
          }  w-full text-xl btn btn-ghost  hover:text-white hover:bg-blue-800`}>Posts</button>
          <button onClick={()=>setActive("following")} className=
          {`${active === 
            "following" ? "bg-blue-800 text-white" : ""
          } w-full text-xl btn btn-ghost  hover:text-white hover:bg-blue-800 `}>Following</button>
          <button onClick={()=>setActive("LikesandSaves")} 
          className={` ${active === 
            "LikesandSaves" ? "bg-blue-800 text-white" : ""
          }  w-full text-xl btn btn-ghost  hover:text-white hover:bg-blue-800`}>Likes And Saved</button>
        </div>
        <div>
          {
            active === "posts" ? 
            <>
            <div className="flex flex-col p-4 gap-4">
            <h1 className="text-2xl font-bold">POSTS</h1>
            {blogsLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : blogs.length > 0 ? (
              blogs.map((blog, index) => {
                return (
                <>
                  <Accordion key={index} blog={blog} />
                </>
              )
              })
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <h1 className="text-2xl font-bold">No Blogs Yet</h1>
              </div>
            )}
          </div>
            </>
            : <Following _id={auth?._id}/>
            
          }
        </div>
      </div>

     
    </div>
  );
};



const Following = ({_id}) =>{
  const  {subscribedProfile, isSubProfileLoading} = useSubscribedProfile(_id);
  return(
    <>
    {
      isSubProfileLoading ? <div className="w-full h-full flex justify-center items-center">  
      <span className="loading-spinner"></span>
      </div> :
      <div className="flex flex-row w-full justify-around flex-wrap items-center">
      {
        subscribedProfile?.map((sub)=>{
          return(
            <ProfileCard author={sub}/>
          )
        })
      }
      </div>
    }
    </>
  )
}

const Accordion = ({ blog }) => {
  const publishedAt = new Date(blog.createdAt).toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const {setEditorState} = useEditorStateContext();

  return (
    <div className="bg-gradient-br from-white to-stone-300 grid p-10 grid-cols-[4fr_2fr_2fr]  rounded-lg shadow-md ">
      <Link to={{ pathname: `/blog/${blog.slug}` }} className="w-full">
        <div className="flex flex-col  ">
          <h1 className="text-blue-500 text-2xl font-bold ">{blog.heading}</h1>
          <div className="flex flex-row">
            <h1 className=" text-lg font-bold">publishedAt:</h1>
            <p className="text-lg">{`${publishedAt}`}</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-row gap-4 items-center justify-center">
        <div
          className="tooltip tooltip-bottom tooltip-secondary"
          data-tip={`${blog.likesCount} likes`}
        >
          <CiHeart size={25} color="#FF0000" />
        </div>
        <div
          className="tooltip tooltip-bottom tooltip-primary  "
          data-tip={`${blog.viewsCount} views`}
        >
          <HiOutlineEye size={25} color="cyan" />
        </div>
        <div
          className="tooltip tooltip-bottom tooltip-info"
          data-tip={`${blog.commentsCount} comments`}
        >
          <FaRegComment size={25} color="" />
        </div>
      </div>
      <div className="flex flex-row justify-end items-center">
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="">
            <button className="btn btn-circle btn-md btn-ghost">
              <SlOptions />
            </button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-slate-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li className="flex flex-col justify-between items-center">
              <Link
                className="w-full justify-center "
                to={{ pathname: `stats/${blog.slug}` }}
              >
                Stats <TfiStatsUp />
              </Link>
            </li>
            <li>
              <Link
                className="w-full justify-center"
                to={{
                  pathname: `/createBlog/${blog._id}`,
                }}

                onClick={()=>setEditorState({
                  id: blog._id,
                  title: blog.heading,
                  html: blog.content,
                  cover: blog.coverImage,
                  edit : true,
                })}

              >
                Edit
              </Link>
            </li>
            <li>
              <button className="btn text-red-500 btn-ghost" onClick={()=>document.getElementById(blog._id).showModal()}>DELETE</button>
            </li>
          </ul>
        </div>
      </div>
      <CheckModal name={blog.heading} _id={blog._id}/>
    </div>
  );
};

export default Dashboard;
