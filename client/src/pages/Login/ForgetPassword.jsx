import { useState } from "react";
import useForgetPassword from "../../hooks/Login/useForgetPassword";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { forgetPassword, isLoading, isSuccess } = useForgetPassword();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword(email);
    setEmail("");
  };



  return (
    <>
    <div className=" flex flex-col justify-around items-center w-full h-screen bg-slate-400">
      <div className="bg-slate-200 border  rounded-2xl flex gap-4 flex-col justify-center items-center w-1/2 h-1/2">
        <h1 className="text-3xl font-bold text-center text-black">
          Forgot Password
        </h1>
        <input
          onChange={handleChange}
          value={email}
          type="text"
          placeholder="email"
          className="border w-2/5 rounded-xl p-5 bg-white text-black"
        />
        <button className="btn primary w-2/5" onClick={handleSubmit}>
          {isLoading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            "next"
          )}
        </button>
      </div>
    </div>
    </>
  );
};

export default ForgetPassword;
