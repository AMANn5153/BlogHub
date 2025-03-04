import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBar from "../../components/textEditor/ToolBar";
import {EditorContent } from "@tiptap/react";
import useEditComment from "../../hooks/Comment/useEditComment";
import useEditorContext, {
  EditorContextProvider,
} from "../../components/textEditor/EditorContext/EditorContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const CommentEdit = () => {
  const { name, blogId, commentId } = useParams();

  

  return (
    <div className=" flex flex-col items-start justify-between  w-full gap-4 w-full h-full  ">
      <div className="flex flex-row items-start justify-start p-5 w-full  ">
       <Link to={`/blog/${blogId}`}><h1 className="text-2xl font-bold text-cyan-400 ">{name}</h1></Link>
      </div>
      <div className="flex flex-row items-start w-full justify-center   w-full ">
        <h1 className="text-2xl font-bold  ">Edit Comment</h1>
      </div>
      <div className="flex flex-col items-center  flex-shrink-0  justify-center w-full h-full">
        <EditorContextProvider purpose="commentEdit">
          <Edit commentId={commentId}  name={name} blogId={blogId}/>
        </EditorContextProvider>
      </div>
    </div>
  );
};

const Edit = ({ commentId, name, blogId }) => {
  const navigate = useNavigate();
  const { editor } = useEditorContext();
  const [edit, setEdit] = useState("");
  const { editCommentLoading, updateComment } = useEditComment();

  useEffect(()=>{
    editor.commands.setContent(JSON.parse(localStorage.getItem(`comment-${commentId}`)));
  },[commentId])
  

  useEffect(() => {
    setEdit(editor.getHTML());
  }, [editor?.getHTML()]);


  const handleEdit = async (e) => {
    if(edit === "<p></p>"){
      toast.error("empty comment");
      return;
    }
    await updateComment(commentId, edit);
    setEdit("");
    localStorage.removeItem(`comment-${commentId}`);
    navigate(`/comment/${name}/${blogId}/${commentId}`);
  };

  return (
    <>
        <div className="flex flex-col items-start justify-between w-1/2">
          <div className="w-full">
            <ToolBar />
          </div>
          <div className=" rounded-lg w-full border border-2 border-cyan-600 border border-2  ">
            <EditorContent editor={editor} />
          </div>
          <div className="flex flex-col mt-6  items-start w-full">
            <button onClick={handleEdit} className="btn btn-primary">
              {editCommentLoading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
    </>
  );
};

export default CommentEdit;
