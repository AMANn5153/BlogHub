import React from 'react';
import useAuthContext from '../../context/authContext/useAuthContext';
import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/logout/useLogout';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

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
       <button className='btn btn-ghost text-white text-xl  hover:cursor-pointer '>Create Blog</button>
     </NavLink>
      : 
      <NavLink to="/login">
        <button className='btn btn-ghost text-white text-xl  hover:cursor-pointer hover:bg-green-200 hover:text-black'>Login</button>
      </NavLink>
      }
      
      {!auth ? 
      <NavLink to="/signup">
        <button className='btn btn-ghost text-white text-xl hover:bg-red-200 hover:text-black hover:cursor-pointer'>Signup</button>
      </NavLink>
      :""
      }
    
    </div>
    {auth ? 
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={profilePic} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className=" menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
        <li>
          <NavLink to = "/dashboard" className="justify-between">
          DashBoard
          </NavLink>
            
        </li>
        <li><button>Settings</button></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>:""}
  </div>
</div>
</div>
    </>
  )
}

export default Navbar