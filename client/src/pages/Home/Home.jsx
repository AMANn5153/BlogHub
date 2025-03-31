import {useState} from "react";
import Card from "../../components/Card/Card";
import useGetAllBlog from "../../hooks/Blog/useGetAllBlog";
import { VscListFilter } from "react-icons/vsc";
import BlogSearch from "../../components/Search/BlogSearch";

const Home = () => {
  const [filter, setFilter] = useState("mostLiked");
  const [page, setPage] = useState(1);
  const { blogs, loading, totalDocuments } = useGetAllBlog(filter,page);
  

  const handleFilter = (e)=>{
    setFilter(e.target.name);
  }
  
  const handlePrevPage = ()=>{
    setPage(page-1);
  }

  const handleNextPage = ()=>{
    setPage(page+1);
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
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-800">Blogs</h1>
        </div>
        <div className="flex w-full h-full flex-row items-center justify-around p-5 flex-wrap">
          <div className="w-full bg-gradient-to-br from-white to-stone-100 rounded-lg h-20 flex flex-row items-center justify-around">
            <BlogSearch/>
            <div className="tooltip tooltip-left dropdown dropdown-bottom btn btn-circle btn-md hover:bg-stone-400 flex items-center justify-center hover:cursor-pointer" data-tip="Filter">
              <div tabIndex={0} className="text-black"><VscListFilter size={30} color="darkblue"/></div>
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
                    slug = {blog.slug}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="join bg-white">
          <button onClick={handlePrevPage} disabled={page === 1} className="join-item btn bg-white">«</button>
          <button className="join-item btn tooltip tooltip-bottom bg-white" data-tip={`maxPage ${Math.ceil(totalDocuments/10)}`}>{`page ${page}`}</button>
          <button onClick={handleNextPage} disabled={page === Math.ceil(totalDocuments/10)} className="join-item btn bg-white">»</button>
        </div>
      </div>
    </>
  );
};

export default Home;
