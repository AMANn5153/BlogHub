import React, { useState } from "react";
import LineCharts from "../../components/LineChart/LineCharts";
import useGetLineChartData from "../../hooks/analytics/useGetLineChartData";
import useAnalyticsStore from "../../store/useAnalyticsStore";
import { useParams, Link } from "react-router-dom";
import StatsCard from "../../components/Stats/StatsCard";

import { FcLike } from "react-icons/fc";
import { FaEye, FaCommentAlt } from "react-icons/fa";
import useGetBlog from "../../hooks/Blog/useGetBlog";
import useBlogStore from "../../store/useBlogStore";
import timeDuration from "../../utils/time";
import useAuthContext from "../../context/authContext/useAuthContext";

const Stats = () => {
  const {auth} = useAuthContext();
  const { blogID } = useParams();
  const { loading } = useGetBlog(blogID);
  const [period, setPeriod] = useState(7);
  const { isWeeklyLoading } = useGetLineChartData(blogID, period);
  const { like, view, comment } = useAnalyticsStore();
  const likes = like[like.length - 1];
  const views = view[view.length - 1];
  const comments = comment[comment.length - 1];

  const { blog } = useBlogStore();

  const {duration} = timeDuration(auth?.createdAt);


  return (
    <>
      <div className="flex p-5 flex-col w-full justify-between items-start gap-5">
        <Link to={{ pathname: `/blog/${blog?._id}` }}><h1 className="text-4xl text-blue-700 font-bold ">
          {loading || !blog ? "" : blog?.heading}
        </h1></Link>
        <div role="tablist" className="tabs tabs-bordered">
          <input
            onClick={() => setPeriod(7)}
            type="radio"
            name="my_tabs_1"
            role=" tab"
            className="text-black tab"
            aria-label="Weekly"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-10">
            {isWeeklyLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : (
              <Content
                like={like}
                view={view}
                comment={comment}
                statsCard={{ likes, views, comments }}
              />
            )}
          </div>

          <input
            onClick={() => setPeriod(30)}
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="text-black tab"
            aria-label="Monthly"
          />
          <div role="tabpanel" className="tab-content p-10">
            {isWeeklyLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : (
              <Content
                like={like}
                view={view}
                comment={comment}
                statsCard={{ likes, views, comments }}
              />
            )}
          </div>
          <input
            onClick={() => setPeriod(duration)}
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="text-black tab"
            aria-label="Total"
        />

        <div role="tabpanel" className="tab-content p-10">
            {isWeeklyLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : (
              <Content
                like={like}
                view={view}
                comment={comment}
                statsCard={{ likes, views, comments }}
              />
            )}
          </div>
        
        </div>
      </div>
    </>
  );
};

const Content = ({ like, view, comment, statsCard }) => {
  const { likes, views, comments } = statsCard;

  return (
    <div className="flex flex-col w-full gap-5 justify-between">
      <div className="w-full">
        <StatsCard totalAnalytics={{ likes, views, comments }} />
      </div>
      <div className="bg-white w-full h-auto shadow-md rounded-lg p-5">
        <div className="flex flex-row w-full m-5">
          <h1 className="text-4xl font-bold">Likes</h1>
          <FcLike />
        </div>
        <LineCharts data={like} xAxis="date" yAxis="likes" />
      </div>
      <div className="bg-white flex flex-col justify-between w-full h-auto shadow-md rounded-lg p-5">
        <div className="flex flex-row w-full m-5 ">
          <h1 className="text-4xl font-bold">Views</h1>
          <FaEye color="blue" />
        </div>
        <LineCharts data={view} xAxis="date" yAxis="views" />
      </div>
      <div className="bg-white flex flex-col justify-between w-full h-auto shadow-md rounded-lg p-5">
        <div className="flex flex-row w-full m-5">
          <h1 className="text-4xl font-bold">Comments</h1>
          <FaCommentAlt color="green" />
        </div>
        <LineCharts data={comment} xAxis="date" yAxis="comments" />
      </div>
    </div>
  );
};

export default Stats;
