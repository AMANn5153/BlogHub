import { useEffect, useCallback, useRef } from "react";
import "./TextEditor.css";
import useEditorContext from "./EditorContext/EditorContext";
import { EditorContent } from "@tiptap/react";

// hoooks

import useRemoveCoverImage from "../../hooks/Blog/useRemoveCoverImage";
import useCoverImage from "../../hooks/Blog/useCoverImage";
import ToolBar from "./ToolBar";

// TextEditor component

const TextEditor = ({
  setConvertedContent,
  setHeading,
  setCoverImage,
  coverImage,
  heading,
}) => {
  // upload image and auth
  const { removeCoverImage } = useRemoveCoverImage();
  const { uploadCoverImage } = useCoverImage();
  const { editor } = useEditorContext();

  // html content handler
  useEffect(() => {
    setConvertedContent(editor.getHTML());
  }, [editor?.getHTML()]);

  const coverImageName = coverImage ? coverImage.split("/") : "";

  const handleCoverImage = async (e) => {
    const image = e.target.files[0];
    const { url, name } = await uploadCoverImage(image);
    setCoverImage(`${url}`);
  };

  
  const handleRemoveCoverImage = async () => {
    await removeCoverImage(coverImageName[coverImageName.length - 1]);
    setCoverImage("");
  };

  const changeHeading = (e) => {
    setHeading(e.target.value);
  };

  if (!editor) {
    return;
  }

  return (
    <>
      {!coverImage ? (
        <div className=" flex rounded-md border-2 border-green-300 flex-col justify-center items-center w-48 h-14">
          <h1 className="text-white text-xl font-bold font-sans m-2">
            Cover Image
          </h1>
          <input
            type="file"
            placeholder="cover image"
            className="
          absolute z-0 w-52 h-10 opacity-0 
          hover:cursor-pointer"
            onChange={handleCoverImage}
          />
        </div>
      ) : (
        <div className=" flex rounded-md border-2 border-green-300 overflow-hidden  flex-col justify-center items-center w-48 h-14">
          <button
            className="btn btn-secondary w-48 h-14"
            onClick={handleRemoveCoverImage}
          >{`remove ${coverImageName[coverImageName.length - 1]}`}</button>
        </div>
      )}
      <textarea
        placeholder="HEADING"
        value={heading}
        className=" w-full 
              bg-transparent  p-5 
            text-white font-extrabold text-6xl outline-none
            resize-none"
        onChange={changeHeading}
      ></textarea>
      <div className=" text-wrap border-1 ">
        <div className="sticky top-0">
          <ToolBar />
        </div>
        <div className=" w-full h-full p-4">
          <EditorContent editor={editor} className="leading-relaxed " />
        </div>
      </div>
      <div></div>
    </>
  );
};

export default TextEditor;
