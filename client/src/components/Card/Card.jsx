import React from "react";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import timeDuration from "../../utils/time";
import parse from "html-react-parser";
import { CiHeart } from "react-icons/ci";
import { BsEye } from "react-icons/bs";
import useAuthContext from "../../context/authContext/useAuthContext";
import Dropdown from "../Dropdown/Dropdown";

const Card = ({
  title,
  author,
  createdAt,
  content,
  coverImage,
  blogId,
  likes,
  views,
  comments,
}) => {
  const {auth} = useAuthContext();
  const { duration, time, dateString } = timeDuration(createdAt);
  const readTime = Math.ceil(parse(content).length/200);
  return (
    <>
        <div className="bg-white grid grid-cols-[4fr_2fr]   ">
          <div className="flex flex-col  m-2 p-12 cursor-pointer ">
            <div className="flex flex-row gap-2 items-start">
              <Dropdown author = {author} createdAt={createdAt}/>
              <div tabIndex={1} className="flex flex-col">
                <Link to={{ pathname: `/profile/${author?._id}` }}>
                  <span className="font-bold hover:underline text-black">{author.name}</span>
                </Link>
                <span className="text-gray-800">
                  {dateString} &nbsp; {time > 0 ? time : duration}{" "}
                  {time > 0 ? "hours" : duration > 1 ? "days" : "day"} ago
                </span>
                <span className="text-gray-800">
                  {readTime > 0 ? readTime : "less than 1 "} min read
                </span>
            </div>
            </div>
            <Link to={{ pathname: `/blog/${blogId}` }}>
            <div className="flex flex-col m-10 gap-3 justify-between items-start">
              <h2 className="text-2xl text-cyan-500 hover:text-cyan-500 font-bold">
                {title}
              </h2>
              <p className="text-gray-800">
                {parse(content.substring(0, 150))}
              </p>
            </div>
            </Link>
            <div className="flex w-full flex-row  gap-4 items-start">
              <div
                className="flex tooltip tooltip-bottom tooltip-secondary flex-row gap-2 items-center"
                data-tip="Likes"
              >
                <CiHeart size={20} color="#FF0000" />
                <span className="text-md">{likes}</span>
              </div>
              <div
                className="flex flex-row gap-1 tooltip tooltip-bottom items-center"
                data-tip="Comments"
              >
                <FaRegComment size={15} />
                <span className="text-md">{comments}</span>
              </div>
              <div
                className="flex flex-row gap-1 tooltip tooltip-bottom tooltip-primary items-center"
                data-tip="Views"
              >
                <BsEye size={15} color="blue" />
                <span className="text-md">{views}</span>
              </div>
            </div>
          </div>
          {coverImage ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-40 h-40 ">
                <img
                  src={coverImage}
                  alt=""
                  className="rounded-lg shadow-sm object-contain  w-40 h-40"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
    </>
  );
};

export default Card;
