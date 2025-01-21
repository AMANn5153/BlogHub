import {useRef} from "react";
import { TbHeartPlus } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import timeDuration from "../../utils/time";
import useGetBlog from "../../hooks/Blog/useGetBlog";
import Comment from "../../components/Comment/Comment";
import useGetComment from "../../hooks/Comment/useGetComment";
import CommentCard from "../../components/Card/CommentCard";
import "../../components/textEditor/TextEditor.css";
import { EditorContextProvider } from "../../components/textEditor/EditorContext/EditorContext";
import useAuthContext from "../../context/authContext/useAuthContext";
import LoginModal from "../../components/Modal/LoginModal";

const Blogs = () => {
  const commentRef = useRef();
  const { id } = useParams(); 
  const {blog} = useGetBlog(id);
  const {comments, commentLoading} = useGetComment(id);
  const {auth} = useAuthContext();

  if(!blog){
    return <div className="flex w-full h-full items-center justify-center">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  }

  const {heading, author, createdAt, content, coverImage} = blog ;

  const {duration, time, dateString} = timeDuration(createdAt);


  const handleCommentView = () =>{
    commentRef.current.scrollIntoView({behavior: "smooth"});
  }
  

  const handleLikeView = () =>{

  }

  return (
    <>
      <div className=" grid w-full grid-cols-[1fr_12fr] gap-4 ">
        <div className="grid-cols-1 h-screen border bg-black rounded-2xl sticky top-0 border-white">
          <div className="h-full rounded-2xl flex flex-col justify-center p-5 items-center">
            <div className="flex flex-col justify-around h-1/2 w-full items-center">
              <div className="text-3xl font-bold hover:cursor-pointer flex flex-col justify-center">
                <button className="hover:text-red-500" onClick={auth ? handleLikeView : ()=>{document.getElementById("my_modal_3").showModal()}}><TbHeartPlus/></button>
                <div className="text-lg text-center">1</div>
              </div>
              <div className="text-3xl font-bold hover:cursor-pointer tooltip" data-tip="Comments">
                <button type="button" className="hover:text-amber-300" onClick={handleCommentView} ><FaRegComment /></button>
                <div className="text-lg text-center">{comments.length}</div>
              </div>
              <div className="text-3xl font-bold hover:cursor-pointer">
                <button className="hover:text-cyan-600" onClick={auth ? handleCommentView : ()=>{document.getElementById("my_modal_3").showModal()}}><FiBookmark /></button> 
              <div className="text-lg text-center">1</div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden max-w-full rounded-2xl border border-white">
          <div className=" rounded-lg border overflow-hidden border-10 border-red w-full flex flex-col justify-center items-center">
            <img
              src={coverImage}
              alt=""
              className="border border-cyan-400 fit w-full h-auto"
            />
          </div>
          <div className="m-6  flex flex-row justify-start items-center">
            <div className="avatar">
              <div className="w-20 rounded-full">
                <img src={author.profilePic} alt="" />
              </div>
            </div>
            <div className="m-1 flex flex-col">
              <h1 className="text-xl font-bold">{author.name}</h1>
              <h1>
                {dateString} &nbsp; {time > 0 ? time : duration}{" "}
                {time > 0 ? "hours" : duration > 1 ? "days" : "day"} ago
              </h1>
            </div>
          </div>
          <div className="m-6 w-full flex flex-col justify-center items-start">
            <h1 className="text-7xl font-bold">{heading}</h1>
          </div>
          <br/>
          <div className="flex justify-center items-center">
          <hr className=" w-1/3"/>
          </div>
          <br/>
          <div className=" tiptap m-6 max-w-screen flex flex-col flex-wrap justify-center items-start">
            {parse(content)}
          </div>
        <hr ref={commentRef}/>
          <div>
            <h1 className="text-2xl font-bold m-6 text-white">Top Comments</h1>
          </div>
          <br/>
          <div  className="flex flex-col gap-4 w-full">

          <EditorContextProvider purpose="comment">
            <Comment blogId={blog._id}/>
          </EditorContextProvider>

            {
              commentLoading?<span className="loading loading-infinity loading-lg"></span>:
              comments.length > 0 ?comments.map((comment, index)=>{
                return (<>
                <div className="flex flex-col">
                <CommentCard key={index} comment={comment}/>
                {comment.replies.length > 0 ? comment.replies.map((reply, index)=>{
                  return (
                    <div className="m-10">
                      <CommentCard key={index} comment={reply}/>
                    </div>
                )
                }) : ""}
                </div>
                </>
              )
              }) :""
            }
          </div>
        </div>
      </div>
      <LoginModal/>
    </>
  );
};

export default Blogs;
