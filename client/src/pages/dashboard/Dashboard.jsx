import useAuthContext from "../../context/authContext/useAuthContext";
import { Tabs } from "flowbite-react";
import { BsFilePost } from "react-icons/bs";
import { BiStats } from "react-icons/bi";
import { SlUserFollow } from "react-icons/sl";
import useGetStats from "../../hooks/analytics/useGetStats";
import useAnalyticsStore from "../../store/useAnalyticsStore";

const Dashboard = () => {
  const { auth } = useAuthContext();
  const { isLoading } = useGetStats();
  const { totalAnalytics } = useAnalyticsStore();

  console.log(totalAnalytics);

  return (
    <div className="grid  grid-rows-[2fr_2fr_4fr] gap-4">
      <div className=" grid-rows-1 flex flex-row justify-start">
        <h1 className="text-6xl font-bold">Hello {auth.name}</h1>
      </div>
      {!isLoading ? (
        <div className=" grid-rows-2 flex flex-row items-start justify-between">
          <div className=" bg-white border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
            <h1 className="text-6xl font-bold">{totalAnalytics?.comments}</h1>
            <h1 className="text-2xl font-bold">Total comments</h1>
          </div>
          <div className=" bg-white border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
            <h1 className="text-6xl font-bold">{totalAnalytics?.likes}</h1>
            <h1 className="text-2xl font-bold">Total Likes</h1>
          </div>
          <div className="bg-white border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
            <h1 className="text-6xl font-bold">{totalAnalytics?.views}</h1>
            <h1 className="text-2xl font-bold">Total Views</h1>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}

      <div className="flex flex-row p-4 gap-4">
        <Menu />
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab text-black"
        aria-label="POSTS"
      />
      <div role="tabpanel" className="tab-content text-black p-10">
        POSTS
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab text-black"
        aria-label="STATS"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content text-black p-10">
        STATS
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab text-black"
        aria-label="SETTINGS"
      />
      <div role="tabpanel" className="tab-content text-black p-10">
        SETTINGS
      </div>
    </div>
  );
};

export default Dashboard;


