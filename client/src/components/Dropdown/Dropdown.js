import React from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import { Link } from "react-router-dom";
import timeDuration from "../../utils/time";

const Dropdown = ({ author }) => {
  const { auth } = useAuthContext();

  const handleFollow = (e) => {
  };

  return (
    <div className="dropdown dropdown-hover">
        <div tabIndex={0} className=" avatar">
            <div className="w-12 rounded-full">
                <img src={author.profilePic} />
            </div>
        </div>
        <div
        tabIndex={0}
        className="flex flex-col gap-4 dropdown-content bg-white  rounded-box z-[1] w-60 p-2 shadow shadow-md"
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
            <h1 className="text-xl hover:text-cyan-800 hover:underline font-bold">
              {author.name}
            </h1>
          </Link>
        </div>
        <div>
          <p>Creative Developer, Generative AI| JavaScript, HTML, CSS</p>
        </div>
        <div>
          {auth?._id !== author?._id ? (
            <button
              className="btn bg-blue-950 text-white btn-sm"
              onClick={handleFollow}
            >
              Follow
            </button>
          ) : (
            <button className="btn bg-blue-950 text-white btn-sm">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
