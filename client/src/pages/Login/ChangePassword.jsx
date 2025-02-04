import { useState } from "react";
import useChangePassword from "../../hooks/Login/useChangePassword";
import { useParams } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { changePassword, isLoading } = useChangePassword();
  const token = useParams().token;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(password, confirmPassword, token);
    setPassword("");
    setConfirmPassword("");
  };

  const handleMouseDownConfirm = (e) => {
    setShowConfirmPassword(true);
  };

  const handleMouseUpConfirm = () => {
    setShowConfirmPassword(false);
  };

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <div className=" flex flex-col justify-center items-center w-full h-screen bg-slate-400">
      <div className="bg-slate-200 border  rounded-2xl flex gap-4 flex-col justify-center items-center w-1/2 h-1/2">
        <h1 className="text-3xl font-bold text-center text-black">
          Change Password
        </h1>
        <div className="flex w-2/5 h-14  flex-row items-center justify-end ">
          <input
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className=" w-full  rounded-xl p-2 h-10 border border-black bg-gray-100 text-black"
          />
             {showPassword ? (
            <FaRegEye
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="text-black absolute z-50 m-2 hover:cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="text-black absolute z-50 m-2 hover:cursor-pointer"
            />
          )}
        </div>
        <div  className="flex w-2/5 flex-row items-center justify-end ">
          <input
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="border border-black w-full rounded-xl p-2 h-10 bg-gray-100 text-black"
          />
          {showConfirmPassword ? (
            <FaRegEye
              onMouseDown={handleMouseDownConfirm}
              onMouseUp={handleMouseUpConfirm}
              className="text-black absolute z-50 m-2 hover:cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              onMouseDown={handleMouseDownConfirm}
              onMouseUp={handleMouseUpConfirm}
              className="text-black absolute z-50 m-2 hover:cursor-pointer"
            />
          )}
        </div>

        <button className="btn primary w-2/5" onClick={handleSubmit}>
          {isLoading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            "Change"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
