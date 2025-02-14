import React from "react";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import timeDuration from "../../utils/time";
import parse from "html-react-parser";
import { CiHeart } from "react-icons/ci";
import { BsEye } from "react-icons/bs";

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
  const { duration, time, dateString } = timeDuration(createdAt);

  return (
    <>
      <Link to={{ pathname: `/blog/${blogId}` }}>
        <div className="grid grid-cols-[4fr_2fr] bg-white  ">
          <div className="flex flex-col  m-2 p-12 cursor-pointer ">
            <div className="flex flex-row gap-2 items-start">
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={author.profilePic} />
                  </div>
                </div>
                <div tabIndex={0} className="flex flex-col">
                  <div></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{author.name}</span>
                <span className="text-gray-800">
                  {dateString} &nbsp; {time > 0 ? time : duration}{" "}
                  {time > 0 ? "hours" : duration > 1 ? "days" : "day"} ago
                </span>
              </div>
            </div>
            <div className="flex flex-col m-10 gap-3 justify-between items-start">
              <h2 className="text-2xl hover:text-cyan-500 font-bold">
                {title}
              </h2>
              <p className="text-gray-800">
                {parse(content.substring(0, 150))}
              </p>
            </div>
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
              <div className="w-40 h-40 rounded-2xl">
                <img
                  src={coverImage}
                  alt=""
                  className="rounded-2xl w-40 h-40"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
    </>
  );
};

export default Card;
