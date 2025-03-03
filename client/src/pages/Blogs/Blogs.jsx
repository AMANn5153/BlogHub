import { useRef, useEffect } from "react";
import { TbHeartPlus } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import parse from "html-react-parser";
import timeDuration from "../../utils/time";
import useGetBlog from "../../hooks/Blog/useGetBlog";
import Comment from "../../components/Comment/Comment";
import useGetAllComment from "../../hooks/Comment/useGetAllComment";
import CommentCard from "../../components/Card/CommentCard";
import "../../components/textEditor/TextEditor.css";
import { EditorContextProvider } from "../../components/textEditor/EditorContext/EditorContext";
import useAuthContext from "../../context/authContext/useAuthContext";
import LoginModal from "../../components/Modal/LoginModal";
import useCommentStore from "../../store/useCommentStore";
import useLikePost from "../../hooks/Likes/useLikePost";
import useLikeStore from "../../store/useLikeStore";
import useSaveStore from "../../store/useSaveStore";
import useSave from "../../hooks/Saves/useSave";
import useViewsBlogs from "../../hooks/Blog/useViewsBlogs";
import useBlogStore from "../../store/useBlogStore";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import ProfileCard from "../../components/Card/ProfileCard";
import FollowButton from "../../components/Button/FollowButton";
import ButtonGroup from "../../components/Button/ButtonGroup";

const Blogs = () => {
  const commentRef = useRef();
  const { id } = useParams();
  const { commentLoading } = useGetAllComment(id);
  const { loading } = useGetBlog(id);
  const { comments } = useCommentStore();

  const { auth } = useAuthContext();
  const { likePost } = useLikePost();
  const { likes } = useLikeStore();
  const { saveBlog } = useSaveStore();
  const { postSaveBlog } = useSave();
  const { views } = useViewsBlogs();
  const { blog } = useBlogStore();


  useEffect(() => {
    if (!blog) return;

    const getViewCount = sessionStorage.getItem(`viewCount_${id}`);

    if (!getViewCount) {
      const increaseViews = async () => {
        await views({ id, userId: blog?.author?._id });
      };
      increaseViews();
      sessionStorage.setItem(`viewCount_${id}`, true);
    }
  }, [id, blog?.author]);

  const likedByUser =
    likes.length > 0
      ? likes?.some((like) => like.userId === auth?._id && like.blogId === id)
      : false;
  const savedByUser =
    saveBlog.length > 0
      ? saveBlog?.some(
          (save) => save.userId === auth?._id && save.blogId === id
        )
      : false;

  if (!blog) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  const { heading, author, createdAt, content, coverImage } = blog;

  const { duration, time, dateString } = timeDuration(createdAt);

  const handleCommentView = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLike = async () => {
    await likePost(id, author?._id);
  };

  const handleSave = async () => {
    await postSaveBlog(id);
  };

  return (
    <>
    <div className="grid grid-cols-[12fr_4fr] gap-3">
      <div className=" grid w-full grid-cols-[1fr_12fr] gap-4 ">
        <div className=" bg-gradient-to-br from-white to-stone-100 grid-cols-1 h-screen  border-black-400 rounded-2xl sticky top-0 ">
          <div className="h-full rounded-2xl flex flex-col justify-center p-5 items-center">
            <div className="flex flex-col justify-around h-1/2 w-full items-center">
              <div className="text-3xl font-bold hover:cursor-pointer flex flex-col justify-center">
                <div className="flex items-center justify-center rounded-full w-12 h-12">
                  <button
                    className="btn btn-ghost btn-circle bg-white hover:bg-white text-red-500 " 
                    onClick={
                      auth
                        ? handleLike
                        : () => {
                            document.getElementById("my_modal_3").showModal();
                          }
                    }
                  >
                    {likedByUser ? <FcLike size={30}/> : <TbHeartPlus size={30}/>}
                  </button>
                </div>
                <div className="text-lg text-center">{likes.length}</div>
              </div>
              <div
                className=" hover:cursor-pointer tooltip"
                data-tip="Comments"
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-circle bg-white hover:bg-white text-amber-300 "
                  onClick={handleCommentView}
                >
                  <FaRegComment size={30} />
                </button>
                <div className="text-lg text-center">{comments.length}</div>
              </div>
              <div className="text-xl font-bold hover:cursor-pointer">
                <button
                  className="btn btn-ghost btn-circle bg-white hover:bg-white text-cyan-600"
                  onClick={
                    auth
                      ? handleSave
                      : () => {
                          document.getElementById("my_modal_3").showModal();
                        }
                  }
                >
                  {savedByUser ? <FcBookmark  size={30}/> : <FiBookmark size={30}/>}
                </button>
                <div className="text-lg text-center">{saveBlog.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-stone-100 overflow-hidden max-w-full rounded-2xl  ">
          <div className="   overflow-hidden  w-full flex flex-col justify-center items-center">
            <img
              src={coverImage}
              alt=""
              className=" object-contain w-full h-60 "
            />
          </div>
          <div className="flex flex-row  w-full justify-between items-center">
            <div className="m-6   flex flex-row justify-between items-center">
              <Dropdown author={author} />
              <div className="m-1 flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                  <Link to={{ pathname: `/profile/${author._id}` }}>
                    <h1 className="text-xl hover:text-cyan-800 font-bold">
                      {author.name}
                    </h1>
                  </Link>
                  <FollowButton authorID={author._id} type="link" />
                </div>
                <h1>
                  {dateString} &nbsp; {time > 0 ? time : duration}{" "}
                  {time > 0 ? "hours" : duration > 1 ? "days" : "day"} ago
                </h1>
              </div>
            </div>
            {auth?._id === author?._id ? <div className="flex m-2 flex-col justify-center items-start">
              <ButtonGroup blog={blog} />
            </div> : null} 
          </div>
          <div className="m-6 w-full flex flex-col flex-wrap overflow-auto justify-center items-start">
            <h1 className="text-6xl break-words font-bold">{heading}</h1>
          </div>
          <br />
          <div className="flex justify-center items-center">
            <hr className=" w-1/3" />
          </div>
          <br />
          <div className="tiptap m-6 max-w-screen flex flex-col flex-wrap justify-center items-start">
            {parse(content)}
          </div>
          <hr />
          <div className="flex flex-row justify-around ">
            <h1 ref={commentRef} className="text-2xl font-bold m-6 text-black">
              Top Comments {comments.length}
            </h1>
            <FollowButton authorID={author._id} />
          </div>
          <br />
          <div ref={commentRef} className="flex flex-col gap-4 w-full">
            <EditorContextProvider purpose="comment">
              <Comment blogId={blog._id} authorId={blog?.author?._id} />
            </EditorContextProvider>
            {commentLoading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : comments.length > 0 ? (
              comments.map((comment, index) => {
                return (
                  <>
                    <div className="hover:cursor-pointer">
                      <CommentCard key={index} comment={comment} blog={{heading,  id}}/>
                    </div>
                  </>
                );
              })
            ) : (
              "No comments yet"
            )}
          </div>
        </div>
      </div>
      <LoginModal />
      <div className="sticky top-0 h-screen">
        <ProfileCard  author={author}/>
      </div>
    </div>
    </>
  );
};

export default Blogs;
