import { NavLink } from "react-router-dom";

const LoginModal = () =>{
    return(
        <dialog id="my_modal_3" className="modal glass-effect text-black ">
        <div className="modal-box bg-white w-full max-h-xl h-1/2 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-secondary absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex h-full flex-col justify-around ">
            <div className="w-full flex justify-normal items-start">
              <h1 className="text-2xl font-bold"> Login in to continue </h1>
            </div> 
            <div className="flex gap-4 items-center flex-col">
              <NavLink to="/login" className="w-2/3 ">
                <button className="bg-lime-600 text-white p-2 h-12 rounded-md w-full">Login</button>
                </NavLink>
                <NavLink to="/Signup" className = "w-2/3 gap-4">
                <button className="bg-red-600 bg text-white p-2 h-12 rounded-md w-full">Create Account</button>
              </NavLink>
          </div>
          </div>
     
        </div>
      </dialog>
    );
}

export default LoginModal;