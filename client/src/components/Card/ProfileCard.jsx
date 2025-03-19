import React from "react";
import FollowButton from "../Button/FollowButton";
import EditButton from "../Button/EditButton";
import useAuthContext from "../../context/authContext/useAuthContext";
import { Link } from "react-router-dom";
import { IoMdLink } from "react-icons/io";

const ProfileCard = ({ author }) => {
  const { name, profilePic,bio, website } = author;
  const {auth} = useAuthContext();
  return (
    <div className="card  card-normal bg-gradient-to-br from-white to-stone-100 shadow-md">
        <div className="avatar card-body">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src={profilePic} alt="profile pic" />
          </div>
        </div>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{bio}</p>
        <Link to={website} className="text-start btn btn-link"><IoMdLink /> {website}</Link>
        <div className="card-actions justify-start">
           { auth?._id === author?._id? <EditButton/> :<FollowButton authorID={author._id}/>}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
