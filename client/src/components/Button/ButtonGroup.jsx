import { CiEdit } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEditorStateContext } from "../../context/editorStateContext/EditorStateContext";
import CheckModal from "../Modal/CheckModal";

const ButtonGroup = ({ blog }) => {
  const { setEditorState } = useEditorStateContext();

  return (
    <ul className="menu bg-white menu-horizontal  rounded-box">
      <li>
        <Link
          className="btn flex items-center hover:bg-stone-100 btn-ghost tooltip tooltip-bottom w-full justify-center "
          to={`/dashboard/stats/${blog.slug}`}
          data-tip="Stats"
        >
          Stats <TfiStatsUp color="green"/>
        </Link>
      </li>
      <li>
        <Link
          className="btn btn-ghost  flex hover:bg-stone-100 items-center tooltip tooltip-bottom w-full justify-center"
          data-tip="Edit"
          to={{
            pathname: `/createBlog/${blog._id}`,
          }}
          onClick={() =>
            setEditorState({
              id: blog._id,
              title: blog.heading,
              html: blog.content,
              cover: blog.coverImage,
              edit: true,
            })
          }
        >
          Edit <CiEdit color="blue"/>
        </Link>
      </li>
      <li>
        <Link
          className="btn flex items-center hover:text-rose-950 hover:bg-gradient-to-br from-red-100 to-red-200  btn-ghost tooltip tooltip-bottom w-full justify-center "
          data-tip="Delete"
          onClick={() => document.getElementById(blog._id).showModal()}
        >
          Delete <MdDeleteOutline color="red"/>
        </Link>
      </li>
      <CheckModal name={blog.heading} _id={blog._id} blogPage={true} />  
    </ul>
  );
};

export default ButtonGroup;
