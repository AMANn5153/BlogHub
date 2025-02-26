import { useState, useEffect } from "react";
import TextEditor from "../../components/textEditor/TextEditor";
import parse from "html-react-parser";
import useAuthContext from "../../context/authContext/useAuthContext";
import useCreateBlog from "../../hooks/Blog/useCreateBlog";
import useEditorContext from "../../components/textEditor/EditorContext/EditorContext";
import { Link, useParams } from "react-router-dom";
import { FaHeading } from "react-icons/fa6";
import {useEditorStateContext} from "../../context/editorStateContext/EditorStateContext";
import Heading from "@tiptap/extension-heading";

const CreateBlog = () => {
  const { auth } = useAuthContext();
  const { createBlog, loading } = useCreateBlog();
  const {blogId} = useParams();
  const { editor } = useEditorContext();
  const { editorState } = useEditorStateContext();


  // blog already exists in the local storage
  const {title , html, cover, id} = editorState


  const [convertedContent, setConvertedContent] = useState(
   html 
  );

  const [heading, setHeading] = useState(title );

  const [coverImage, setCoverImage] = useState(cover);

  // create and save blog to local storage
  useEffect(() => {
    localStorage.setItem(
      !blogId ? `user-${auth._id}-Blog-1` : `user-${auth._id}-${id}-edit`,
      JSON.stringify({
        author: auth._id,
        title: heading,
        cover: coverImage,
        html: convertedContent,
      })
    );
  }, [heading, convertedContent, coverImage]);

  const handlePublish = async () => {
    await createBlog({
      author: auth._id,
      coverImage,
      title: heading,
      content: convertedContent,
      status: "published",
    });

    localStorage.removeItem(`user-${auth._id}-Blog-1`);
    setHeading("");
    setConvertedContent("");
    setCoverImage("");
    editor.commands.clearContent(true);
  };

  const handleSave = async () => {
    await createBlog({
      author: auth._id,
      coverImage,
      title: heading,
      content: convertedContent,
      status: "draft",
    });
  };

  return (
    <>
      <div className="grid grid-cols-[12fr_1fr] bg-gradient-to-br from-white to-stone-100">
        <div className="flex flex-col h-auto ">
          <div
            role="tablist"
            className="tabs m-5  text-black tabs-bordered"
          >
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab text-xl"
              aria-label="Edit"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content rounded-box p-6"
            >
              <TextEditor
                setConvertedContent={setConvertedContent}
                setHeading={setHeading}
                heading={heading}
                setCoverImage={setCoverImage}
                coverImage={coverImage}
              />
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab text-xl"
              aria-label="Preview"
            />
            <div role="tabpanel" className="tab-content rounded-box p-6">
              <div className="tiptap w-full h-full">
                {parse(`
              <img src="${coverImage}" alt="" className="h-auto max-w-screen-md rounded-lg"/>
              <hr/>
              <h1>${heading}</h1>
              ${convertedContent}`)}
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-shrink-0 m-5 justify-around items-center w-60 h-60">
            <button
              className="btn  color-white  hover:btn-info hover:text-white bg-blue-500 rounded rounded-md  text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className=" btn color-white btn bg-green-400 hover:btn-success hover:text-white rounded rounded-md text-white font-bold py-2 px-4 rounded"
              onClick={handlePublish}
            >
              publish
            </button>
          </div>
        </div>
        <div className="flex m-5 flex-col justify-start items-center">
          <Link to={{ pathname: "/" }}>
          <button
            className="tooltip tooltip-bottom btn btn-circle btn-error"
            data-tip="close Editor"
          >
            X
          </button></Link>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
