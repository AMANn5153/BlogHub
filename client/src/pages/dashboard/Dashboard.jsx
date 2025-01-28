import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import useAuthContext from "../../context/authContext/useAuthContext"
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const Dashboard = () => {
    const {auth} = useAuthContext();

  return (
    <div className = "grid  grid-rows-[2fr_2fr_4fr]">
        <div className="grid-rows-1 flex flex-row justify-start">
            <h1 className="text-6xl font-bold">Hello {auth.name}</h1>
        </div>
        <div className="grid-rows-2 flex flex-row items-start justify-between">
            <div className = "border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
                <h1 className="text-6xl font-bold">1</h1>
                <h1 className="text-2xl font-bold">Total Posts</h1>
            </div>
            <div className = "border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
                <h1 className="text-6xl font-bold">1</h1>
                <h1 className="text-2xl font-bold">Total Likes</h1>
            </div>
            <div className = "border rounded-2xl w-96 p-10 flex flex-col justify-start gap-3">
                <h1 className="text-6xl font-bold">100</h1>
                <h1 className="text-2xl font-bold">Total Views</h1>
            </div>
        </div>
        <div className=" flex flex-row border border-white gap-4">
            <div className="border border-red-400">
                <li>followers</li>
                <li></li>
                <li></li>
            </div>
            <div className=" ">
                <h1>Posts</h1>
                <Menu/>
            </div>
        </div>
    </div>
  )

}


const Menu = () => {

    const data = [
        {
          label: "Dashboard",
          value: "dashboard",
          icon: Square3Stack3DIcon,
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "Profile",
          value: "profile",
          icon: UserCircleIcon,
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Settings",
          value: "settings",
          icon: Cog6ToothIcon,
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
      ];
    return (
        <>
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
        </>
    );
}

export default Dashboard