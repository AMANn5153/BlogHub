import { useParams } from "react-router-dom";

const Profile = () => {
    const {id} = useParams();
    
  return (
    <div className="flex bg-slate-200 flex-col h-screen justify-center items-center">
        <div className="w-1/2 h-1/2 flex">
            <div className="border border-2 border-black w-full h-full flex flex-col justify-start items-center">
                <div className="rounded-full w-40 h-40 bg-white border-2 border-black">
                </div>
            </div> 
            <div className="flex flex-col justify-center items-center">

            </div>
        </div>
    </div>
  )
}

export default Profile