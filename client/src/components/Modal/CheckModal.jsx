import { useState } from "react";
import useDeleteBlog from "../../hooks/Blog/useDeleteBlog";
import { toast } from "react-toastify";

const CheckModal = ({name, _id}) => {
    const [text, setText] = useState("");
    const {deleteBlog, isDeleteBlogLoading} = useDeleteBlog();

    const changeText = (e)=>{
        const value = e.target.value;
        setText(value);
    }

    const deleteSubmit = async () => {
        if(text !== name){
            toast.error("invalid text", {
                position : "top-center",
                autoClose : 5000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,   
            });
            return;
        }
        await deleteBlog(_id);
        setText("");
    }

  return (
    <dialog id={_id} className="modal  modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-4xl">Delete Blog!</h3>
        <p className="py-4">Type <span className="text-red-500 text-lg">{name}</span> to confirm</p>
        <div className="">
          <form method="dialog">
            <div className="flex flex-col justify-center items-center w-full gap-4">
                <input className="input border border-red-500 outline-red-800 text-red-800" onChange={changeText} value={text}/>
                <button className="btn hover:bg-red-900 bg-red-600 text-white" onClick ={deleteSubmit}>Confirm</button>
                <button className="btn">Close</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default CheckModal;
