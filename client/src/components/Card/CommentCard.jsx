import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import parse from "html-react-parser";
import "../textEditor/TextEditor.css"
import useEditorContext, { EditorContextProvider } from "../textEditor/EditorContext/EditorContext";
import ToolBar from "../textEditor/ToolBar";
import { EditorContent } from "@tiptap/react";
import useAuthContext from "../../context/authContext/useAuthContext";
import LoginModal from "../Modal/LoginModal";
import usePostReply from "../../hooks/Reply/usePostReply";
import useLikePostComment from "../../hooks/Likes/usePostLikeComment";
import useLikeStore from "../../store/useLikeStore";
import {Link, useNavigate} from "react-router-dom";
import { FcLike } from "react-icons/fc";
import Dropdown from "../Dropdown/Dropdown";
import {useEditorStateContext} from "../../context/editorStateContext/EditorStateContext";
import { CiEdit } from "react-icons/ci";
import timeDuration from "../../utils/time";
import { SlOptions } from "react-icons/sl";
import { MdOutlineDelete } from "react-icons/md";
import useDeleteComment from "../../hooks/Comment/useDeleteComment";

const CommentCard = ({comment , blog}) => {
  const [reply, setReply] = useState(false);
  const {likePostComment} = useLikePostComment();
  const {CommentLike} = useLikeStore();
  const {auth} = useAuthContext();
  const {setEditorState} = useEditorStateContext();
  const {deleteCommentLoading, deleteComment} = useDeleteComment();
  const navigate = useNavigate();
  const {heading, id} = blog;

  
  const changeLike = async () =>{
    await likePostComment(comment._id);
  }


  const changeReply = () => {
    setReply(true);
  }

  const handleEdit = () =>{
    localStorage.setItem(`comment-${comment._id}`, JSON.stringify(comment.comment));
    setEditorState(comment.comment);
    navigate(`/editComment/${heading}/${id}/${comment._id}`);
  }

  const handleDelete = async () => {
    await deleteComment(comment._id);
  }

  const{ dateString} = timeDuration(comment?.createdAt);

  const likedByUser = CommentLike.length> 0 ? CommentLike?.some((like)=>like.userId === auth?._id && like.commentId === comment._id ) : false;

 

  return (
    <>
      <div className="bg-white rounded rounded-2xl grid ml-6 mb-6 p-4 w-2/3 grid-cols-[1fr_12fr] " >
        <div className="grid-cols-1">
          <Dropdown author={comment?.author}/>
        </div>
        <div className=" grid-col-2 grid-rows-[12fr_1fr]">
          <div className="  border border-1 rounded-xl ">
            <div className="flex flex-row justify-between items-center">
            <Link to={{pathname:`/profile/${comment?.author?._id}`}}>
              <div className="ml-2 mt-2 text-black hover:underline hover:text-cyan-700 font-semibold"> 
                {comment?.author?.name}
              </div>
            </Link>
            {comment?.author?._id === auth?._id ?
            <div className="dropdown dropdown-bottom ">
              <button tabIndex={0} className=" m-2 btn btn-circle btn-sm btn-ghost">
                <SlOptions />
              </button>
              <ul tabIndex={0} className=" bg-gradient-to-br from-white to-stone-200 flex flex-col dropdown-content menu-sm bg-slate-100 rounded-box z-[1] w-52 p-2 shadow">
                <li className="btn btn-ghost" onClick={handleEdit} >Edit <CiEdit /></li>
                <li className="btn btn-ghost hover:bg-red-600"
                 onClick={handleDelete} >{deleteCommentLoading ? 
                 <span className="loading loading-ring"></span> : ("Delete")} <MdOutlineDelete /></li>
              </ul>
            </div>: null}
            </div>
            <div className="ml-2 "><p className="text-sm">{dateString}</p></div>
            <Link to={{pathname:`/comment/${heading}/${id}/${comment._id}`}}>
              <div className="tooltip tooltip-bottom" data-tip="Open comment Thread">
                <p className="tiptap">{parse(comment?.comment)}</p>
              </div>
            </Link>
          </div>
        
          <div className=" card-footer flex flex-row m-2 items-start w-full">
            {
              reply 
              ?
              <>
              <EditorContextProvider purpose="reply">
                <Reply removeReply={setReply} commentId={comment._id} blog={blog}/>
              </EditorContextProvider>
              </>
              :
              <>
              <button className="btn p-1 btn-ghost btn-sm btn-circle tooltip tooltip-bottom hover:cursor-pointer"
              onClick={changeLike}
              data-tip="like">
              {
              likedByUser?<FcLike size={20}/>:
              <IoIosHeartEmpty size={20}/>
              } 
              </button>
              <button className="btn p-1 btn-ghost btn-sm btn-circle tooltip tooltip-bottom hover:cursor-pointer"
                onClick={changeReply}
                data-tip="reply">
                  <GoComment size={20}/>
              </button>

              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};


export const Reply = ({removeReply, commentId, blog})=>{
  const {postReply} = usePostReply();
  const { editor } = useEditorContext();
  const [reply, setReply] = useState(null);
  const {auth} = useAuthContext();
  const navigate = useNavigate();
  const {heading, id} = blog;

  useEffect(()=>{
    setReply(editor.getHTML());
  },[editor?.getHTML()]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postReply({reply, commentId});
    setReply("");
    editor.commands.clearContent();
    navigate(`/comment/${heading}/${id}/${commentId}`);
  }
  
  return(
    <>
      <div className="flex flex-col justify-center hover:cursor-text items-start gap-4">
      <div>
            <div className="bg-transparent w-full border-2 border-cyan-300 shadow-md  rounded-xl ">
              <EditorContent editor={editor} />
            </div>
            <div className="sticky bottom-0 w-full rounded-xl">
              <ToolBar />
            </div>
          </div>
          <div className="flex gap-4 flex-row">
            <button
              type="submit"
              className={`btn  btn-primary `}
              onClick={
                auth
                  ? handleSubmit
                  : () => document.getElementById("my_modal_3").showModal()
              }
            >
              Comment
            </button>
            <button className="btn  btn-primary btn-ghost" onClick={()=>removeReply(false)}>
              Dismiss
            </button>
          </div>
      </div> 
        <LoginModal/>
    </>
  )
}


export default CommentCard;
