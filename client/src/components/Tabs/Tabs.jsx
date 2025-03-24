import {useState} from "react";
import useGetSave from "../../hooks/Saves/useGetSave";
import useSaveStore from "../../store/useSaveStore";
import Card from "../Card/Card";
import { CiFilter } from "react-icons/ci";
import useGetAllBlogsOfUser from "../../hooks/analytics/useGetAllBlogsOfUser";
import useBlogStore from "../../store/useBlogStore";

const Tabs = ({id}) => {
  const {saveLoading} = useGetSave(id);
  const  {savedBlogByUser} = useSaveStore();

  const {isLoading : blogsLoading} = useGetAllBlogsOfUser(id);
  const {blogs} = useBlogStore(); 

  if(!blogs || saveLoading){
    return (
      <div className="flex w-full h-full items-center justify-center">  
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }

  


  return (
    <div role="tablist" className="tabs ml-3 tabs-bordered">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab text-black"
        aria-label="Posts"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content">
      <div className = "flex flex-row w-full justify-start items-end">
          <div><CiFilter size={25} color="#FF0000" /></div>
      </div> 
      { blogs?.length > 0 ?  blogs?.map((blog, index) => { 
      return(
      <>
        <Card
          key={index}
          title={blog?.heading}
          author={blog?.author}
          createdAt={blog?.createdAt}
          content={blog?.content}
          coverImage={blog?.coverImage}
          blogId={blog?._id}
          likes={blog?.likesCount}
          views={blog?.viewsCount}
          comments={blog?.commentsCount}
          slug={blog?.slug}
        
        /></>)}) : <div className="flex flex-col h-screen items-center justify-center">
            <h1 className = "text-2xl  text-gray-600 font-bold text-center">No Blogs Yet</h1>
          </div>}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab text-black w-full"
        aria-label="Saves"
      />
      <div role="tabpanel" className="tab-content">
        {saveLoading || !savedBlogByUser ? 
          <div className="flex w-full h-full items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div> 
        : savedBlogByUser.length > 0 ? savedBlogByUser.map((save, index) => {
          return (
            <>
              <Card
                key={index}
                title={save?.blog?.heading}
                author={save?.blog?.author}
                createdAt={save?.blog?.createdAt}
                content={save?.blog?.content}
                coverImage={save?.blog?.coverImage}
                blogId={save?.blog?._id}
                likes={save?.blog?.likesCount}
                views={save?.blog?.viewsCount}
                comments={save?.blog?.commentsCount}
                slug={save?.blog?.slug}
              />
            </>
          );
        })  : <div className="flex flex-col h-screen items-center justify-center">
            <h1 className = "text-2xl  text-gray-600 font-bold text-center">No Saves Yet</h1>
          </div>}
      </div>
    </div>
  );
};

export default Tabs;
