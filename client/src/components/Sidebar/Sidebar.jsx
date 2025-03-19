import React from "react";
import { FaBars } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content lg:hidden">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <FaBars />
        </label>
      </div>
      <div className="drawer-side lg:drawer-open">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gradient-to-br from-white to-rose-100  text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Blogs</a>
          </li>
          <li>
            <a>
              Reviews
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
