import useAuthContext from "../../context/authContext/useAuthContext";
import { Tabs } from "flowbite-react";
import { BsFilePost } from "react-icons/bs";
import { BiStats } from "react-icons/bi";
import { SlUserFollow } from "react-icons/sl";
import useGetStats from "../../hooks/analytics/useGetStats";
import useAnalyticsStore from "../../store/useAnalyticsStore";
import useGetWeeklyStats from "../../hooks/analytics/useGetWeeklyStats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { SlOptions } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { HiOutlineEye } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import useBlogStore from "../../store/useBlogStore";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { auth } = useAuthContext();
  const { isLoading } = useGetStats();
  const { totalAnalytics, likeWeekly, viewWeekly, commentsWeekly } =useAnalyticsStore();
  const {isLoading : blogsLoading} = useGetAllBlogsOfUser(auth._id);
  const {blogs} = useBlogStore();


  return (
    <div className="grid grid-rows-[2fr_2fr] gap-4">
      <div className=" grid-rows-1 flex flex-row justify-start">
        <h1 className="text-6xl font-bold">Hello {auth.name}</h1>
      </div>
      <div className="w-full">
        {!isLoading ? (
          <UsersBlogs totalAnalytics={totalAnalytics} />
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 gap-4">
        <h1 className="text-2xl font-bold">POSTS</h1>
        {
          blogsLoading ? <div className="flex w-full h-full items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div> : blogs.length > 0 ? blogs.map((blog, index) => {
          return<Accordion blog={blog}/>
        }) : <div className="flex w-full h-full items-center justify-center">
          <h1 className="text-2xl font-bold">No Blogs Yet</h1>
        </div>
        }
      </div>
    </div>
  );
};

const Accordion = ({blog}) => {
 
  const publishedAt = new Date(blog.createdAt).toLocaleDateString("en-US",{timeZone : "Asia/Kolkata"});

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
            <button className="btn btn-circle btn-md btn-ghost"><SlOptions /></button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-slate-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <button className="btn text-black btn-ghost" >Stats</button>
            </li>
            <li>
              <button className="btn text-black btn-ghost">Edit</button>
            </li>
            <li>
              <button className="btn text-red-500 btn-ghost">
                DELETE
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const UsersBlogs = ({ totalAnalytics }) => {
  const { auth } = useAuthContext();
  return (
    <div className="stats shadow bg-white w-full text-black">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-black">Total Likes</div>
        <div className="stat-value text-black">{totalAnalytics.likes}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-black">Page Views</div>
        <div className="stat-value text-black">{totalAnalytics.views}</div>
        <div className="stat-desc"></div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src={auth?.profilePic} />
            </div>
          </div>
        </div>
        <div className="stat-title text-black">Comments</div>
        <div className="stat-value text-black">{totalAnalytics.comments}</div>
      </div>
    </div>
  );
};

export default Dashboard;
