import React from 'react'
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import timeDuration from "../../utils/time";



const Card = ({
  title,
  author,
  createdAt,
  content,
  coverImage,
  blogId
}) => {

  const {duration, time, dateString} = timeDuration(createdAt);

  return (
    <>
    <Link 
      to={{pathname:`/blog/${blogId}`}}
      

    >
      <div className = "flex flex-col border border-1 border-white m-5 p-12 rounded-md shadow-xl hover:border-2 cursor-pointer border-cyan-400 hover: shadow-lg active: shadow-sm transition-transform duration-150 ease-in-out">
        <div className="flex flex-row gap-2 items-start">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={author.profilePic} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className='font-bold'>{author.name}</span>
            <span className="">{dateString} &nbsp; {time > 0 ? time :duration} {time > 0 ? "hours" : duration > 1 ? "days" : "day"} ago</span>
          </div>
        </div>
        <div className='flex flex-col m-10 justify-between items-start'>
          <h1 className="text-5xl hover:text-cyan-500 font-bold">
            {title}
          </h1>
        </div>
        <div className='flex w-full flex-row m-10 gap-10 items-start'>
          <span className="text-xl">1 Like</span>
          <div className="flex flex-row gap-2 items-center">
            <FaRegComment />
            <span className="text-xl">2 Comments</span>
          </div>
        </div>
      </div>
      </Link>
    </>
  )
}

export default Card