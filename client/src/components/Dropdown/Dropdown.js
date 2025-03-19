import React from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import { Link } from "react-router-dom";
import timeDuration from "../../utils/time";
import FollowButton from "../Button/FollowButton";
import EditButton from "../Button/EditButton";

const Dropdown = ({ author }) => {
  const { auth } = useAuthContext();
  
  return (
    <div className="dropdown dropdown-hover">
        <div tabIndex={0} className=" avatar">
            <div className="w-12 rounded-full">
                <img src={author.profilePic} />
            </div>
        </div>
        <div
        tabIndex={0}
        className="flex flex-col gap-4 overflow-auto dropdown-content bg-white  rounded-box z-[1] w-60 p-2 shadow shadow-md"
        >
        <div className="w-20 h-20 rounded-full">
          <img
            src={author.profilePic}
            alt="profile pic"
            className="rounded-full w-20 h-20"
          />
        </div>
        <div>
          <Link to={{ pathname: `/profile/${author._id}` }}>
            <h1 className="text-xl text-black hover:text-cyan-800 hover:underline font-bold">
              {author.name}
            </h1>
          </Link>
        </div>
        <div>
          <p className="text-black">{author.bio}</p>
        </div>
        <div>
          {auth?._id !== author?._id ? (
            <FollowButton authorID={author?._id}/>
          ) : (
            <EditButton/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
