import { EditorContent } from "@tiptap/react";
import ToolBar from "../textEditor/ToolBar";
import useEditorContext from "../textEditor/EditorContext/EditorContext";
import usePostComment from "../../hooks/Comment/usePostComment";
import useAuthContext from "../../context/authContext/useAuthContext";
import { useState, useEffect } from "react";
import LoginModal from "../Modal/LoginModal";

const Comments = ({blogId}) => {
  const [comment, setComment] = useState("");
  const { postComment } = usePostComment();
  const { auth } = useAuthContext();
  const { editor } = useEditorContext();


  useEffect(() => {
    setComment(editor.getHTML());
  }, [editor?.getHTML(), setComment]);

  console.log(blogId);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await postComment({ comment, blogId });
    setComment("");
    editor.commands.clearContent();
  };



  return (
    <>
      <div className="m-6 flex flex-col justify-center items-center">
        <div className="w-2/3 grid grid-cols-[1fr_12fr] gap-4">
          {/* avatar */}
          <div className="grid-cols-1">
            <div className="avatar ">
              <div className="w-12 rounded-full">
               <img src={auth?.profilePic ? auth?.profilePic : "https://avatar.iran.liara.run/public/job/teacher/male"} /> 
              </div>
            </div>
          </div>

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
              className="btn  btn-primary tooltip tooltip-bottom hover:cursor-pointer"
              onClick={
                auth
                  ? handleSubmit
                  : () => document.getElementById("my_modal_3").showModal()
              }
              data-tip={`${auth ? "Comment" : "Login to comment"}`}

              
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <LoginModal/>
    </>
  );
};

export default Comments;
