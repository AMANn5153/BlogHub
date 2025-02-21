import Card from "../../components/Card/Card";
import useGetAllBlog from "../../hooks/Blog/useGetAllBlog";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";

const Home = () => {
  const [filter, setFilter] = useState("mostLiked");
  const { blogs, loading } = useGetAllBlog(filter);

  const handleFilter = (e)=>{
    setFilter(e.target.name);
  }
 
  if(!blogs || loading){
    return (<div className="flex w-full h-full items-center justify-center">
    <span className="loading loading-infinity loading-lg"></span>
  </div>)
  }
  
  

  return (
    <>
      <div className="flex flex-row m-10 rounded-xl h-full justify-around items-center flex-wrap">
        <div className="flex flex-col justify-center p-5 items-center">
          <h1 className="text-4xl font-bold">Blogs</h1>
        </div>
        <div className="flex w-full h-full flex-row items-center justify-around p-5 flex-wrap">
          <div className="w-full bg-stone-200 rounded-lg h-20 flex flex-row items-center justify-around">
            <input
              type="search"
              placeholder="what are you looking for?"
              className="input text-black bg-white placeholder:text-black input-bordered w-full max-w-xs"
            />
            <div className="tooltip tooltip-left dropdown dropdown-bottom hover:cursor-pointer" data-tip="Filter">
              <div tabIndex={0} className="text-black"><CiFilter size={30}/></div>
              <div tabIndex={0} className="dropdown-content menu w-58  z-[100] rounded-box p-2  shadow-lg">
                  <li>
                    <button name="latest" onClick={handleFilter} className="w-full btn btn-ghost hover:bg-white p-1 bg-white text-black">Latest</button>
                  </li>
                  <li>
                    <button name="mostLiked" onClick={handleFilter} className="w-full btn btn-ghost hover:bg-white p-1 bg-white text-black">Most Liked</button>
                  </li>
                  <li>
                    <button name="mostCommented" onClick={handleFilter} className="w-full btn btn-ghost hover:bg-white p-1 bg-white  text-black">Most Commented</button>
                  </li>
              </div>
            </div>
          </div> 
          <div className="flex w-full bg-stone-300 flex-col justify-around align-center flex-wrap ">
            {loading ? (
              <div className="flex w-full h- full items center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : (
              blogs?.map((blog, index) => {
                return (
                  <Card
                    key={index}
                    title={blog.heading}
                    author={blog.author}
                    createdAt={blog.createdAt}
                    content={blog.content}
                    coverImage={blog.coverImage}
                    blogId={blog._id}
                    likes={blog.likesCount}
                    views={blog.viewsCount}
                    comments={blog.commentsCount}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 1</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </>
  );
};

export default Home;
