import { useState } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import { Link } from "react-router-dom";
import useUpdateUser from "../../hooks/Settings/useUpdateUser";
import useUpdatePassword from "../../hooks/Settings/useUpdatePassword";
import Alert from "../../components/Alert/Alert";

const Settings = () => {
  const [activated, setActivated] = useState("profile");
  const { auth, userLoading } = useAuthContext();

  
  if(userLoading && !auth){
    return(
      <div className="flex w-full h-full items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }

  return (
    <>
      <div className=" grid grid-cols-[2fr_5fr]">
        <div className="h-screen flex flex-col justify-center items-start rounded-xl">
          <div className=" flex flex-col gap-1 items-center justify-start h-1/2 w-4/5 m-5">
            <div className="w-full ">
              <button
                onClick={() => setActivated("profile")}
                className={`w-full btn btn-ghost hover:bg-indigo-600
                            hover:text-white text-xl rounded-lg 
                            ${
                              activated === "profile"
                                ? "bg-blue-600 text-white"
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
                  activated === "account" ? "bg-blue-600 text-white" : ""
                } w-full btn btn-ghost hover:bg-indigo-600 hover:text-white text-xl rounded-lg`}
              >
                Account
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <Link to={`/profile/${auth?._id}`}>
            <div
              role="button"
              className="btn btn-link  text-xl underline font-bold text-blue-700 "
            >
              {auth?.username}
            </div>
          </Link>
          {activated === "profile" ? <ProfileSettings /> : <AccountSettings />}
        </div>
      </div>
    </>
  );
};

const ProfileSettings = () => {
  const { auth, userLoading } = useAuthContext();
  const [isChange, setIsChange] = useState(false);
  const [profile, setProfile] = useState({
    username: auth?.username ,
    email: auth?.email ,
    name: auth?.name ,
    bio: auth?.bio || "",
    website: auth?.website || "",
    work: auth?.workingAt || "",
    location: auth?.location || "",
    education : auth?.education || "",
    profilePic : auth?.profilePic || "",
  });

  const [image, setProfileImage] = useState( auth?.profilePic || "");

  const {updateUser} =useUpdateUser();

  const save = async()=>{
    await updateUser(profile);
  }

  const changeValues = (e) => {
    setIsChange(true);
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const changeProfilePic = (e)=>{
    const blob = new Blob([e.target?.files[0]], {type: "image/png"});
    const profileImage = URL.parse(URL.createObjectURL(blob));
    setProfileImage(profileImage);
    setProfile({...profile, profilePic : e.target?.files[0]});
  }


  return (
    <>
      <div className="flex flex-col justify-around gap-10 w-full">
        <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md ">
          <div className="w-full flex flex-col items-start justify-between">
            <label className="font-semibold">Name</label>
            <input
              name="name"
              maxLength={20}
              minLength={2}
              onChange={changeValues}
              value={profile.name}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
            <div className="flex w-1/2 flex-row justify-end">
              <span className="text-gray-800">{profile.name?.length}/20</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-between">
            <label className="font-semibold">Username</label>
            <input
              name="username"
              maxLength={20}
              minLength={2}
              onChange={changeValues}
              value={profile.username}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
            <div className="flex w-1/2 flex-row justify-end">
              <span className="text-gray-800">{profile.username?.length}/20</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-between">
            <label className="font-semibold">Email</label>
            <input
              name="email"
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
                  <img src={image} />
                </div>
              </div>
              <input
                type="file"
                className="file-input file-input-ghost w-full max-w-xs"
                onChange={changeProfilePic}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md">
          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Bio</label>
            <textarea
              name="bio"
              maxLength={200}
              minLength={5}
              placeholder="write something about yourself"
              onChange={changeValues}
              value={profile.bio}
              className="border-2 input h-24 placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
            <div className="flex w-1/2 flex-row justify-end">
              <span className="text-gray-800">{profile.bio?.length}/200</span>
            </div>
          </div>

          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Website</label>
            <input
              name="website"
              placeholder={`eg. https://www.${auth?.name}.com`}
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
              placeholder="eg. New Delhi, Kolkata"
              onChange={changeValues}
              value={profile.location}
              maxLength={20}
              minLength={2}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
            <div className="flex w-1/2 flex-row justify-end">
              <span className="text-gray-800">{profile.location?.length}/20</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md">
          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Work</label>
            <input
              name="work"
              placeholder="eg. Software Engineer"
              onChange={changeValues}
              value={profile.work}
              maxLength={20}
              minLength={2}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
            <div className="flex w-1/2 flex-row justify-end">
              <span className="text-gray-800">{profile.work?.length}/20</span>
            </div>
          </div>

          <div className="w-full flex flex-col h-auto items-start justify-between">
            <label className="font-semibold">Education</label>
            <input
              name="education"
              placeholder="eg. B.Tech in Computer Science"
              onChange={changeValues}
              value={profile.education}
              maxLength={20}
              minLength={2}
              className="border-2 input placeholder-black bg-white
                        text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
            />
            <div className="flex w-1/2 flex-row justify-end">
              <span className="text-gray-800">{profile.education?.length}/20</span>
            </div>
          </div>
        </div>

        <div className={`${isChange ? "sticky bottom-0": ""} flex flex-col w-full gap-5 p-10 rounded-md `}>
            <button onClick={save} className ="w-full btn btn-primary ">Save</button>
        </div>
      </div>
    </>
  );
};

const AccountSettings = () => {
  const {loadingState, updatePassword} = useUpdatePassword();
  const [passwordChangeState, setPasswordChangeState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const changeValues = (e)=>{
    setPasswordChangeState({...passwordChangeState, [e.target.name] : e.target.value});
  }

  const handleChangePassword = async()=>{
    const message = await updatePassword(passwordChangeState);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 1000);
    setPasswordChangeState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (

    <div className="flex flex-col justify-around gap-10 w-full">
    <div className="flex flex-col w-full gap-5 bg-stone-100 shadow-md p-10 rounded-md">
      <div className="w-full flex flex-col items-start justify-between gap-5">
        <label className="font-semibold">Password Reset</label>
        <input
          name="currentPassword"
          placeholder="current Password"
          className="border-2 input placeholder-black bg-white
                    text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
          value={passwordChangeState.currentPassword}
          onChange={changeValues}
        />
         <input
          name="newPassword"
          placeholder="new password"
          className="border-2 input placeholder-black bg-white
                    text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
          value={passwordChangeState.newPassword}
          onChange={changeValues}
        />
         <input
          name="confirmPassword"
          placeholder="confirm password"
          className="border-2 input placeholder-black bg-white
                    text-black border-gray-300 rounded-md p-2 outline-none w-1/2"
          value={passwordChangeState.confirmPassword}
          onChange={changeValues}
        />

        <button className="btn btn-primary text-white" onClick={handleChangePassword}>
          Change Password
        </button>
        {alertMessage ? <Alert msg={alertMessage} /> : null}
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
