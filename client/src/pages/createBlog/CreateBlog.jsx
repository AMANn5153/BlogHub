import { useState, useEffect } from "react";
import TextEditor from "../../components/textEditor/TextEditor";
import parse from "html-react-parser";
import useAuthContext from "../../context/authContext/useAuthContext";
import useCreateBlog from "../../hooks/Blog/useCreateBlog";
import useEditorContext from "../../components/textEditor/EditorContext/EditorContext";

const CreateBlog = () => {
  const { auth } = useAuthContext();
  const { createBlog, loading } = useCreateBlog();
  const { editor } = useEditorContext();

  // blog already exists in the local storage
  const blog = JSON.parse(localStorage.getItem(`user-${auth._id}-Blog-1`));

  const [convertedContent, setConvertedContent] = useState(
    blog ? blog.html : ""
  );

  const [heading, setHeading] = useState(blog ? blog.title : "");

  const [coverImage, setCoverImage] = useState(blog ? blog.cover : "");

  // create and save blog to local storage
  useEffect(() => {
    localStorage.setItem(
      `user-${auth._id}-Blog-1`,
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
    editor.command.clearContent();
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
      <div className="flex flex-col h-auto ">
        <div role="tablist" className="tabs m-5 tabs-bordered">
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
            className="tab-content bg-base-100 rounded-box p-6"
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
            className="color-white btn btn- hover:btn-info hover:text-white bg-blue-500 rounded rounded-md  text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="color-white btn bg-green-400 hover:btn-success hover:text-white rounded rounded-md text-white font-bold py-2 px-4 rounded"
            onClick={handlePublish}
          >
            publish
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
