import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import useBlogImage from "../../../hooks/Blog/useBlogImage";
import useRemoveImage from "../../../hooks/Blog/useRemoveImage";


export const ImageDeletion = Node.create({
  name: "imageDeletion",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: {
        default: "",
      },
      alt: {
        default: "",
      },
      id: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'img[data-type="imageDeletion"]' }];
  },
  //render html
  renderHTML({ HTMLAttributes }) {
    return ['img', { 'data-type': 'imageDeletion', ...HTMLAttributes }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});

const ImageComponent = (props) => {
  const { node, deleteNode } = props;
  const { src, alt, id } = node.attrs;
  const {loading} = useBlogImage();
  const {removeImage} = useRemoveImage();


/**
 * Asynchronously handles the deletion of an image node.
 * 
 * Uses the `removeImage` function to delete the image based on its name (`id`).
 * After successful deletion, it calls `deleteNode` to remove the node from the editor.
 * 
 * @async
 */

  const deleteHandler= async ()=>{
    await removeImage(id);
    deleteNode();
  }

  return (
    <NodeViewWrapper>
    {loading ?
      <div>
        <span className="loading loading-spinner"></span>
      </div>  
      : 
      <div className="m-10 indicator"> 
        <button className="tooltip tooltip-bottom indicator-item indicator-top indicator-end badge badge-secondary" data-tip="cancel" onClick={deleteHandler}> 
          X 
        </button>
        <div className=" bg-base-300 grid h-32 w-32 place-items-center">
          <img src={src} alt={alt} />
        </div>
      </div>
    }
    </NodeViewWrapper>
  );
};
