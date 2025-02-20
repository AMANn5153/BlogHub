import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import { Link } from "react-router-dom";

const Settings = () => {
  const [activated, setActivated] = useState("profile");
  const { auth } = useAuthContext();

  return (
    <>
      <div className=" grid grid-cols-[2fr_5fr]">
        <div className="h-screen flex flex-col justify-center items-start rounded-xl">
          <div className=" flex flex-col items-center justify-start h-1/2 w-4/5 m-5">
            <div className="w-full">
              <button
                onClick={() => setActivated("profile")}
                className={`w-full btn btn-ghost hover:bg-indigo-600
                            hover:text-white text-xl rounded-lg 
                            ${
                              activated === "profile"
                                ? "bg-slate-600 text-white"
                                : ""
                            }`}
              >
                Profile
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => setActivated("account")}
                className={`${
                  activated === "account" ? "bg-slate-600 text-white" : ""
                } w-full btn btn-ghost hover:bg-indigo-600 hover:text-white text-xl rounded-lg`}
              >
                Account
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <Link to={`/profile/${auth._id}`}>
            <div
              role="button"
              className="btn btn-link  text-xl underline font-bold text-blue-700 "
            >
              {auth.username}
            </div>
          </Link>
          {activated === "profile" ? <ProfileSettings /> : <AccountSettings />}
        </div>
      </div>
    </>
  );
};

const ProfileSettings = () => {
  const { auth } = useAuthContext();
  const [isChange, setIsChange] = useState(false);
  const [profile, setProfile] = useState({
    username: auth.username,
    email: auth.email,
    name: auth.name,
    bio: auth.bio || "write something about yourself",
    website: auth.website || `e.g. https://${auth.name}.com`,
    work: auth.workingAt || "e.g. Software Engineer",
    location: auth.location || "e.g. New Delhi, KolKata",
    education : auth.education || "e.g. B.Tech in Computer Science",
  });

  const changeValues = (e) => {
    setIsChange(true);
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col justify-around gap-10 w-full">
        <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md ">
          <div className="w-full flex flex-col items-start justify-between">
            <label className="font-semibold">Name</label>
            <input
              name="name"
              onChange={changeValues}
              value={profile.name}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-between">
            <label className="font-semibold">Username</label>
            <input
              name="username"
              onChange={changeValues}
              value={profile.username}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-between">
            <label className="font-semibold">Email</label>
            <input
              name="username"
              onChange={changeValues}
              value={profile.email}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-around">
            <label className="font-semibold">Profile Image</label>
            <div className="w-1/2 m-1 flex flex-row items-start justify-between">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                  <img src={auth.profilePic} />
                </div>
              </div>
              <input
                type="file"
                className="file-input file-input-ghost w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md">
          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Bio</label>
            <textarea
              name="bio"
              onChange={changeValues}
              value={profile.bio}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>

          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Website</label>
            <input
              name="website"
              onChange={changeValues}
              value={profile.website}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>

          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Location</label>
            <input
              name="location"
              onChange={changeValues}
              value={profile.location}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md">
          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Work</label>
            <input
              name="work"
              onChange={changeValues}
              value={profile.work}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>

          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Education</label>
            <input
              name="education"
              onChange={changeValues}
              value={profile.education}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
          </div>
        </div>

        <div className={`${isChange ? "sticky bottom-0": ""} flex flex-col w-full gap-5 p-10 rounded-md `}>
            <button className ="w-full btn btn-primary ">Save</button>
        </div>
      </div>
    </>
  );
};

const AccountSettings = () => {
  return (

    <div className="flex flex-col justify-around gap-10 w-full">
    <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md">
      <div className="w-full flex flex-col items-start justify-between gap-5">
        <label className="font-semibold">Password Reset</label>
        <input
          name="current Password"
          placeholder="current Password"
          className="border-2 input placeholder-black bg-white
                    text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
        />
         <input
          name="new password"
          placeholder="new password"
          className="border-2 input placeholder-black bg-white
                    text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
        />
         <input
          name="confirm password"
          placeholder="confirm password"
          className="border-2 input placeholder-black bg-white
                    text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
        />
      </div>
    </div>

    <div  className="flex flex-col w-full shadow-red-300 gap-5 bg-stone-100 shadow-md p-10 rounded-md">
        <h1 className="text-red-900 font-bold">Danger Zone</h1>
        <div className="leading-relaxed">
            <h2 className="text-black font-bold">Delete account</h2> 
            <p>Deleting your account will:</p>
            <p>Delete your account, along with your authentication associations.</p>
            <p>Delete any and all content you have, such as articles, comments, or your reading list.</p>
            <p>Allow your username to become available to anyone.</p>
            <br/>
            <button className="btn bg-red-800 hover:bg-red-900 text-white">Delete Account</button>
        </div>
    </div>

     
    
  </div>
  )
};

export default Settings;
