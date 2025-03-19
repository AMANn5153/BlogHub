import { useCallback } from "react";
import {
  FaBold,
  FaHeading,
  FaCode,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaImage,
  FaLink,
  FaUnlink,
  FaUnderline,
} from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineDash } from "react-icons/ai";


import { LuHeading2, LuHeading } from "react-icons/lu";

import useEditorContext from "./EditorContext/EditorContext";

import useBlogImage from "../../hooks/Blog/useBlogImage";

const ToolBar = () => {
  const { uploadImage } = useBlogImage();
  const { editor } = useEditorContext();

  if (!editor) {
    return;
  }

  const addImage = async (e) => {
    const image = e.target.files[0];

    const { url, name } = await uploadImage(image);

    if (!url || !name) {
      return;
    }

    editor
      .chain()
      .focus()
      .insertContent({
        type: "imageDeletion",
        attrs: {
          src: url,
          alt: "image",
          id: name,
        },
      })
      .run();
  }

  // link handler

  const setLink = () => {
    const url = editor.getAttributes("link").href;

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <>
      <div className="flex flex-row rounded-2xl justify-between items-center p-2 bg-blue-950 h-20">
        <div className="flex flex-row justify-start items-center ">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center items-center text-white hover:bg-blue-900 rounded-md p-2 `}
          data-tip="Bold"
        >
          <FaBold size={20} />
        </button>

        <button
          onClick={
            editor.isActive("underline")
              ? () => editor.chain().focus().unsetUnderline().run()
              : () => editor.chain().focus().toggleUnderline().run()
          }
          className={`${
            editor.isActive("underline") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Underline"
        >
          <FaUnderline size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          className={`${
            editor.isActive("codeBlock") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Code"
        >
          <FaCode size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Italic"
        >
          <FaItalic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive("strike") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Strike"
        >
          <FaStrikethrough size={20} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Heading"
        >
          <LuHeading size={20} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Heading 2"
        >
          <LuHeading2 size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="List"
        >
          <FaListOl size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${
            editor.isActive("orderedList") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="List"
        >
          <FaListUl size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${
            editor.isActive("blockquote") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center text-white items-center hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Quote"
        >
          <FaQuoteLeft size={20} />
        </button>
        <div className="flex justify-center items-center hover:cursor-pointer h-12 w-12 overflow-hidden text-white hover:bg-blue-900 rounded-md p-2">
          <button
            className={` tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center items-center  hover:bg-blue-900 rounded-md p-2  `}
            data-tip="Image"
          >
            <FaImage size={20} />
          </button>
          <input
            type="file"
            className=" absolute z-0 opacity-0 hover:cursor-pointer w-12 h-12"
            onChange={addImage}
          />
        </div>

        <button
          onClick={setLink}
          className={`${
            editor.isActive("link") ? "is-active" : ""
          } tooltip tooltip-bottom hover:cursor-pointer h-12 w-12 flex justify-center items-center text-white hover:bg-blue-900 rounded-md p-2  `}
          data-tip="Link"
        >
          <FaLink size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className={`${
            editor.isActive("orderedList") ? "is-active" : ""
          } hover:cursor-pointer h-12 w-12 flex justify-center items-center text-white hover:bg-blue-900 rounded-md p-2  `}
        >
          <FaUnlink size={20} />
        </button>
        </div>
        <button className="dropdown dropdown-left">
          <div tabIndex={0} className="text-white"><SlOptionsVertical size={20} /></div>
          <div tabIndex={0} className="flex flex-col gap-4 dropdown-content bg-blue-900 m-5 rounded-box z-[1] w-40 p-2 shadow shadow-md"> 
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className=" tooltip tooltip-bottom hover:cursor-pointer h-12 w-full flex justify-center items-center text-white hover:bg-blue-900 rounded-md p-2"
              data-tip="Horizontal Rule"
              >
            <AiOutlineDash size={20} />
            </button>
          </div>
        </button>
        
      </div>
    </>
  );
};

export default ToolBar;
