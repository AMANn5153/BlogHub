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


const CommentCard = ({comment}) => {
  const [reply, setReply] = useState(false);
  const {likePostComment} = useLikePostComment();
  const {CommentLike} = useLikeStore();
  const {auth} = useAuthContext();
 
  const changeLike = async () =>{
    await likePostComment(comment._id);
  }


  const changeReply = () => {
    setReply(true);
  }


  const likedByUser = CommentLike.length > 0 ? CommentLike?.some((like)=>like.userId === auth._id && like.commentId === comment._id ) : false;


  return (
    <>
      <div className="bg-gray-200 rounded rounded-2xl grid ml-6 mb-6 p-4 w-2/3 grid-cols-[1fr_12fr] " >
        <div className="grid-cols-1">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={comment?.author?.profilePic}/>
            </div>
          </div>
        </div>
        <div className=" grid-col-2 grid-rows-[12fr_1fr]">
          <Link to={{pathname:`/comment/${comment._id}`}}>
          <div className="tiptap  border border-1 rounded-xl ">
            <div className="m-5 text-lg font-semibold"> 
              {comment?.author?.name}
            </div>
              {parse(comment?.comment)}
          </div>
          </Link>
          <div className=" card-footer flex flex-row gap-4 items-start w-full">
            {
              reply 
              ?
              <>
              <EditorContextProvider purpose="reply">
                <Reply removeReply={setReply} commentId={comment._id}/>
              </EditorContextProvider>
              </>
              :
              <>
              <button className="btn btn-ghost text-2xl tooltip tooltip-bottom hover:cursor-pointer hover:bg-red-600"
              onClick={changeLike}
              data-tip="like">
              {
              likedByUser?<FcLike/>:
              <IoIosHeartEmpty />
              } 
              </button>
              <button className="btn btn-ghost text-2xl tooltip tooltip-bottom hover:cursor-pointer"
                onClick={changeReply}
                data-tip="reply">
                  <GoComment />
              </button>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};


const Reply = ({removeReply, commentId})=>{
  const {postReply} = usePostReply();
  const { editor } = useEditorContext();
  const [reply, setReply] = useState();
  const {auth} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    setReply(editor.getHTML());
  },[editor?.getHTML()]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postReply({reply, commentId});
    setReply("");
    editor.commands.clearContent();
    navigate(`/comment/${commentId}`);
  }
  
  return(
    <>
      <div className="flex flex-col justify-center items-start gap-4">
      <div>
            <div className="bg-transparent w-full border-2 border-cyan-300 h-56 rounded-xl overflow-y-auto">
              <EditorContent editor={editor} />
            </div>
            <div className="sticky bottom-0 w-full rounded-xl">
              <ToolBar />
            </div>
          </div>
          <div className="flex gap-4 flex-row">
            <button
              type="submit"
              className="btn btn-primary"
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
