import Card from "../../components/Card/Card";
import useGetAllBlog from "../../hooks/Blog/useGetAllBlog";

const Home = () => {
  const { blogs, loading } = useGetAllBlog();

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
          <input
            type="search"
            placeholder="what are you looking for?"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="flex w-full flex-col justify-around align-center flex-wrap ">
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
