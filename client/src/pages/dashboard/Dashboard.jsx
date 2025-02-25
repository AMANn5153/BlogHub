import useAuthContext from "../../context/authContext/useAuthContext";

import useGetStats from "../../hooks/analytics/useGetStats";
import useAnalyticsStore from "../../store/useAnalyticsStore";

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

const Dashboard = () => {
  const { auth } = useAuthContext();
  const { isLoading } = useGetStats();
  const { totalAnalytics } = useAnalyticsStore();
  const { isLoading: blogsLoading } = useGetAllBlogsOfUser(auth._id);
  const { blogs } = useBlogStore();

  return (
    <div className="grid grid-rows-[2fr_2fr] gap-4">
      <div className=" grid-rows-1 flex flex-row justify-start">
        <h1 className="text-6xl font-bold">Hello {auth.name}</h1>
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

      <div className="flex flex-col p-4 gap-4">
        <h1 className="text-2xl font-bold">POSTS</h1>
        {blogsLoading ? (
          <div className="flex w-full h-full items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog, index) => {
            return <Accordion blog={blog} />;
          })
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <h1 className="text-2xl font-bold">No Blogs Yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

const Accordion = ({ blog }) => {
  const publishedAt = new Date(blog.createdAt).toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const {setEditorState} = useEditorStateContext();

  return (
    <div className="grid p-10 grid-cols-[4fr_2fr_2fr] bg-white rounded-lg shadow-md ">
      <Link to={{ pathname: `/blog/${blog._id}` }} className="w-full">
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
                to={{ pathname: `stats/${blog._id}` }}
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
              <button className="btn text-red-500 btn-ghost">DELETE</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
