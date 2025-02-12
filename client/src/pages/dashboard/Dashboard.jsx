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

import useBlogStore from "../../store/useBlogStore";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";

const Dashboard = () => {
  const { auth } = useAuthContext();
  const { isLoading } = useGetStats();
  const { totalAnalytics, likeWeekly, viewWeekly, commentsWeekly } =
    useAnalyticsStore();
  const {isLoading : blogsLoading} = useGetAllBlogsOfUser();
  const {blogs} = useBlogStore();

  return (
    <div className="grid  grid-rows-[2fr_2fr_4fr] gap-4">
      <div className=" grid-rows-1 flex flex-row justify-start">
        <h1 className="text-6xl font-bold">Hello {auth.name}</h1>
      </div>
      {!isLoading ? (
        <UsersBlogs totalAnalytics={totalAnalytics} />
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}

      <div className="flex flex-col  p-4 gap-4">
        <h1 className="text-4xl font-bold">POSTS</h1>
        {
          blogsLoading ? <div className="flex w-full h-full items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div> : blogs.map((blog)=>{
          return <Accordion blog={blog}/>
        })
        }
      </div>
    </div>
  );
};

const Accordion = ({blog}) => {
 


  return (
    <div className="flex flex-row ">
      <div>
        <h1 className="text-black ">{blog.heading}</h1>
      </div>
      <div>
      </div>
      <div>
      <SlOptions />
      </div>
    </div>
  );
};

const UsersBlogs = ({ totalAnalytics }) => {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <div className="stats shadow bg-white text-black">
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
        {/* <div className="stat-desc text-secondary">31 tasks remaining</div> */}
      </div>
    </div>
  );
};

export default Dashboard;
