import { CiEdit } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useEditorStateContext } from "../../context/editorStateContext/EditorStateContext";

const ButtonGroup = ({ blog }) => {
  const { setEditorState } = useEditorStateContext();

  return (
    <ul className="menu bg-white menu-horizontal  rounded-box">
      <li>
        <Link
          className="btn flex items-center hover:bg-stone-100 btn-ghost tooltip tooltip-bottom w-full justify-center "
          to={`/dashboard/stats/${blog._id}`}
          data-tip="Stats"
        >
          Stats <TfiStatsUp color="black"/>
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
          Edit <CiEdit color="black"/>
        </Link>
      </li>
    </ul>
  );
};

export default ButtonGroup;
