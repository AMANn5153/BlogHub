import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSignupContext } from './signupContext/SignupContext';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import  useSignup  from '../../hooks/Signup/useSignup';
import 'react-toastify/dist/ReactToastify.css';


 
export const Signin = () => {

   

    const {registerUser, setRegisterUser} = useSignupContext();

    const handleChange = (e) => {
        setRegisterUser({...registerUser, [e.target.name]: e.target.value});
    }

    const checkButtonDisable = () => {
        if(registerUser.username && registerUser.email && registerUser.fullname){
            return false;
        }
        return true;
    }

  return (
    <div className="bg-gradient-to-br from-white to-red-200 flex flex-col items-center justify-center w-full h-screen">
        <div className="rounded-md flex flex-col items-center justify-around w-4/5 h-4/5">
            <div className="flex flex-col items-start justify-around">
                <h1 className="text-6xl font-bold text-black">Sign up</h1>
            </div>
            <div className="flex flex-col items-start w-1/2 h-4/5 justify-around">

                <div className="w-full">
                    <input className="w-1/2 placeholder-black bg-slate-50 text-black  rounded-md p-5 h-12" 
                    onChange={handleChange}
                    name="username"
                    value={registerUser.username}
                    type="text" placeholder="username" />
                </div>
                <div className="w-full" >
                    <input className="w-1/2 bg-slate-50 placeholder-black text-black rounded-md p-5 h-12" 
                    onChange={handleChange}
                    name="email"
                    value={registerUser.email}
                    type="text" placeholder="email" />
                </div>
                <div className="w-full">
                    <input className="w-1/2 bg-slate-50 placeholder-black text-black rounded-md p-5 h-12" 
                    onChange={handleChange}
                    name="fullname"
                    value={registerUser.fullname}
                    type="text" placeholder="fullname" />
                </div>
                <div className="w-full flex flex-row items-start justify-between">
                    <NavLink to="/upload"> <button className={
                        `bg-red-500 w-20  text-white rounded-md text-center p-2 h-10 
                        ${checkButtonDisable() ? " cursor-not-allowed   " : "cursor-pointer"}`
                        }
                        disabled={checkButtonDisable()}
                    >
                    Next 
                    </button>
                    </NavLink>
                
                    <NavLink to="/login" className="text-black">already have an account? <span className="text-red-500">Login</span></NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}



// upload image 


const UploadImage = () => {
    
    const [image, setImage] = useState();
    const {registerUser, setRegisterUser} = useSignupContext();

    const handleChange = (e) => {
        
        const blob = new Blob([e.target?.files[0]], {type: "image/png"});
        const profileImage = URL.parse(URL.createObjectURL(blob));
        setImage(profileImage);
        setRegisterUser({...registerUser, image:e.target?.files[0]});
    }


    return (
        <div className='flex flex-col h-screen w-full  items-center justify-around bg-gradient-to-br from-white to-red-300'>
            <div className='w-full flex items-center justify-center'><h1 className='text-2xl text-black font-bold'>Upload Image</h1></div>
            <div className=" border border-green-300 rounded-full overflow-hidden w-72 h-72">
                <input type="file" className=" absolute z-0 w-72 h-72 opacity-0 hover:cursor-pointer" onChange={handleChange} />
                <img src={image?.href ?? `https://api.dicebear.com/9.x/initials/svg?seed=${registerUser.fullname}`} alt="profile" className=' absolutez-50 w-full h-full object-cover' />
            </div>
            <NavLink to="/createpassword" className='bg-red-500 text-white rounded-md p-2 h-10'>{image?.href ? "upload": "next"}</NavLink>
        </div>
    )
}


// create password

const CreatePassword = ()=>{
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {registerUser, setRegisterUser} = useSignupContext();
    const {signup, loading} = useSignup();

    const handleChange = (e) => {
        setRegisterUser({...registerUser, [e.target.name]: e.target.value});
    }   

    const handleSignup = async () => {
        await signup(registerUser);
    }

    const handleMouseDown = () => {
        setShowPassword(true);
    }

    const handleMouseUp = () => {
        setShowPassword(false);
    }

    const handleMouseDownConfirm = () => {
        setShowConfirmPassword(true);
    }

    const handleMouseUpConfirm = () => {
        setShowConfirmPassword(false);
    }   

    return (
        <>
        {loading ? <span className="loading loading-ring loading-lg"></span>:
        <div className='flex bg-gradient-to-br from-white to-red-400 flex-col items-center justify-around w-full h-screen'>
        <h1 className='text-2xl font-bold text-black'>Create Password</h1>
            <div className="flex flex-col items-center w-full h-4/5 justify-evenly">
                <div className="flex w-72 flex-row items-center justify-end ">
                    <input className='absolute  z-0 w-72 outline-none rounded-md p-2 h-10' type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={registerUser.password}
                    name="password" placeholder='password' />
                    {showPassword ? 
                    <FaRegEye onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className='absolute z-50 m-2 hover:cursor-pointer'/> : 
                    <FaRegEyeSlash onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className='absolute z-50 m-2 hover:cursor-pointer'/>
                    }
                </div>
                <div className="flex w-72 flex-row items-center justify-end ">
                    <input className='absolute z-0 w-72 outline-none rounded-md p-2 h-10'
                    value={registerUser.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="confirm password" 
                    onChange={handleChange}/>
                    {showConfirmPassword ? 
                    <FaRegEye onMouseDown={handleMouseDownConfirm} onMouseUp={handleMouseUpConfirm} className='absolute z-50 m-2 hover:cursor-pointer'/> : 
                    <FaRegEyeSlash onMouseDown={handleMouseDownConfirm} onMouseUp={handleMouseUpConfirm} className='absolute z-50 m-2 hover:cursor-pointer'/>
                    }
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <button
                    onClick={handleSignup}
                    className={`
                        bg-red-500 text-white rounded-md w-20 p-2 h-10
                        ${registerUser.password && !registerUser.confirmPassword ?
                            "cursor-not-allowed"
                            :
                            "cursor-pointer"
                        }`
                    }

                    disabled={ 
                        !registerUser.password && !registerUser.confirmPassword 
                    }
                    >Signup</button>  
                </div>
            </div>
        </div>
}
        </>
    )
}

export default Signin;
export {UploadImage, CreatePassword};