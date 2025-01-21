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
        <div className = "flex flex-col bg-black items-center justify-center h-screen">
            <div className="flex flex-col bg-black items-start justify-around h-4/5 w-4/5">
            <div className="text-2xl font-bold">
                <h1>Login</h1>
            </div>
            <div className="flex flex-col items-start justify-around h-4/5 w-4/5">
                <div className="w-1/2">
                    <input className="border-2 border-gray-300 rounded-md p-2 outline-none w-2/3"
                    onChange={handleChange} name="usernameOrEmail" 
                    type="text" placeholder="username or email" />
                </div>
                <div className="w-1/2">
                    <input className="border-2 border-gray-300 rounded-md p-2 outline-none w-2/3" onChange={handleChange} name="password" type="password" placeholder="password" />
                </div>
                <div className="w-1/2 flex flex-row justify-between">
                    <button className="bg-lime-600 text-white p-2 rounded-md w-16" onClick={handleSubmit}>Login</button>
                    <NavLink to="/signin">Don't have an account? <span className="text-lime-600 hover:text-lime-800">Sign up</span></NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login;