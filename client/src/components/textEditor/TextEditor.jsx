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

  // heading and cover image handlers
  const coverImageName = coverImage ? coverImage.split("/") : "";

  /**
   * Handles the cover image upload event
   * @param {Event} e event object
   * @returns {Promise<void>}
   */
  const handleCoverImage = async (e) => {
    const image = e.target.files[0];
    const { url, name } = await uploadCoverImage(image);
    setCoverImage(`${url}`);
  };

  /**
   * Handles the cover image remove event
   * @returns {Promise<void>}
   */
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
        placeholder="Heading"
        value={heading}
        className=" w-full h-48 
              bg-transparent  p-5 scrollbar-hide
            text-white font-extrabold text-6xl outline-none
            resize-none"
        onChange={changeHeading}
      ></textarea>
      <div className=" bg-transparent text-wrap border-1 ">
        <ToolBar />
        <div className="max-w-screen-2xl  w-full p-4 overflow-scroll scrollbar-hide">
          <EditorContent editor={editor} className="leading-relaxed" />
        </div>
      </div>
      <div></div>
    </>
  );
};

export default TextEditor;
