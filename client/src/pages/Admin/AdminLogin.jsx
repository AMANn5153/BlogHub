import { BiSolidLogInCircle } from "react-icons/bi";

const AdminLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <fieldset className="bg-gradient-to-br from-white to-rose-200 fieldset w-1/2 h-1/2 flex flex-col items-start gap-4 bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-2xl font-bold flex flex-row items-center gap-4"> Admin Login <BiSolidLogInCircle /></legend>

        <label className="fieldset-label">Email/Username</label>
        <input type="email" className="input" placeholder="Email/Username" />

        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn bg-rose-200 hover:bg-rose-500 hover:text-white mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default AdminLogin;
