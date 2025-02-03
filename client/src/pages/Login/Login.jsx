import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogin from "../../hooks/Login/useLogin";

const Login = () => {
    const [credentials, setCredentials] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const {Login} = useLogin();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        await Login(credentials);
    }

    return (
        <div className = "bg-gray-200 flex flex-col items-center justify-center h-screen">
            <div className=" bg-white flex flex-col rounded-2xl items-center justify-around h-4/5 w-2/3">
            <div className="text-6xl text-slate-950 font-bold">
                <h1>Login</h1>
            </div>
            <div className="flex flex-col items-start justify-around h-1/2 w-2/3">
                <div className="w-1/2">
                    <input className="border-2 input bg-white text-black border-gray-300 rounded-md p-2 outline-none w-4/5"
                    onChange={handleChange} name="usernameOrEmail" 
                    type="text" placeholder="username or email" />
                </div>
                <div className="w-1/2">
                    <input className="border-2 bg-white input text-black border-gray-300 rounded-md p-2 outline-none w-4/5" onChange={handleChange} name="password" type="password" placeholder="password" />
                    <div className="w-4/5 m-3 flex flex-row justify-end text-red-600  "><button >forget password?</button></div> 
                </div>
                <div className="w-1/2 flex flex-row justify-between">
                    <button className="bg-lime-600 text-white p-2 rounded-md w-16" onClick={handleSubmit}>Login</button>
                    <NavLink to="/signup">Don't have an account? <span className="text-lime-600 hover:text-lime-800">Sign up</span></NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login;