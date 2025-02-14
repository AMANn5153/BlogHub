import Card from "../Card/Card";

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
      <div role="tabpanel" className="tab-content p-10">
        {blogs?.map((blog, index) => {return(
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
        />)})}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab text-black"
        aria-label="Reading List"
      />
      <div role="tabpanel" className="tab-content p-10 ">
        Reading List
      </div>
    </div>
  );
};

export default Tabs;
