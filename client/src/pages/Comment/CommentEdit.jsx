import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBar from "../../components/textEditor/ToolBar";
import { EditorContent } from "@tiptap/react";
import useEditComment from "../../hooks/Comment/useEditComment";
import useEditorContext, {
  EditorContextProvider,
} from "../../components/textEditor/EditorContext/EditorContext";
import { useNavigate } from "react-router-dom";

const CommentEdit = () => {
  const { commentId } = useParams();
  return (
    <div className=" flex flex-col items-start justify-between gap-4 w-full h-full  ">
      <div className="flex flex-row items-start justify-start m-2 w-full ">
        <h1 className="text-2xl font-bold  ">Edit Comment</h1>
      </div>
      <div className="flex flex-col items-start flex-shrink-0  justify-start w-full h-full">
        <EditorContextProvider purpose="commentEdit">
          <Edit commentId={commentId} />
        </EditorContextProvider>
      </div>
    </div>
  );
};

const Edit = ({ commentId }) => {
  const navigate = useNavigate();
  const { editor } = useEditorContext();
  const [edit, setEdit] = useState("");
  const { editCommentLoading, updateComment } = useEditComment();

  useEffect(() => {
    setEdit(editor.getHTML());
  }, [editor.getHTML()]);

  const handleEdit = async (e) => {
    await updateComment(commentId, edit);
    setEdit("");
    navigate(`/comment/${commentId}`);
  };

  return (
    <>
        <div className="flex flex-col items-start justify-between w-full">
          <div className="w-full">
            <ToolBar />
          </div>
          <div className=" rounded-lg w-full  ">
            <EditorContent editor={editor} />
          </div>
          <div className="flex flex-row justify-between items-center w-full">
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
