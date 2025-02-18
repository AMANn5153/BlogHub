import Card from "../Card/Card";
import { CiFilter } from "react-icons/ci";

const Tabs = ({ blogs }) => {
  return (
    <div role="tablist" className="tabs tabs-bordered">
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
      { blogs?.length > 0 ?  blogs?.map((blog, index) => {return(
      <>
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
        Reading List
      </div>
    </div>
  );
};

export default Tabs;
