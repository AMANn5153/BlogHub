import React from 'react';
import useAuthContext from '../../context/authContext/useAuthContext';
import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/logout/useLogout';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { MdDashboard, MdOutlineSettings } from 'react-icons/md';
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";



const Navbar = () => {
  const {auth} = useAuthContext();
  const {logout} = useLogout();
  const navigate = useNavigate();


  
  const profilePic = auth?.profilePic;

  const handleLogout= async ()=>{
    await logout();
  }

  return (
    <>
    <div className=' h-full w-3/4 flex align-center justify-center  border border-cyan-300  rounded-2xl  glass-effect'><div className="navbar">
  <div className="flex-1">
  <NavLink to="/">
  <button className="btn btn-ghost text-xl">Blog</button>
  </NavLink>
  </div>
  <div className="flex-none w-1/2 gap-2">

    <div className="flex w-full flex-row items-end justify-evenly form-control">
      
      {auth? 
       <NavLink to="/createBlog">
       <button className='btn btn-ghost text-black text-xl  hover:cursor-pointer '>Create Blog</button>
     </NavLink>
      : 
      <NavLink to="/login">
        <button className='btn btn-ghost text-black text-xl  hover:cursor-pointer hover:bg-green-200 hover:text-black'>Login</button>
      </NavLink>
      }
      
      {!auth ? 
      <NavLink to="/signup">
        <button className='btn btn-ghost text-black text-xl hover:bg-red-200 hover:text-black hover:cursor-pointer'>Signup</button>
      </NavLink>
      :""
      }
    
    </div>
    {auth ? 
    <div className="dropdown rounded-full  dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={profilePic} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="  menu menu-sm bg-white dropdown-content rounded-box mt-3 w-52 p-2 shadow-md">
        <li>
          <NavLink to={`/profile/${auth?._id}`} className="hover:bg-blue-700 hover:text-white justify-between underline">
            {auth?.username}
            <CgProfile />
          </NavLink>
        </li>
        <li>
          <NavLink to = "/dashboard" className="justify-between">
          DashBoard 
          <MdDashboard />
          </NavLink>
            
        </li>
        <li><NavLink to = "/settings" className="justify-between">Settings<MdOutlineSettings />
        </NavLink></li>
        <li><button onClick={handleLogout} className='justify-between'>Logout <RiLogoutCircleLine />
        </button></li>
      </ul>
    </div>:""}
  </div>
</div>
</div>
    </>
  )
}

export default Navbar