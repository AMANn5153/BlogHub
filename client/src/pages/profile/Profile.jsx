import { useParams } from "react-router-dom";

const Profile = () => {
    const {id} = useParams();
    
    
  return (
    <div className = "grid grid-rows-[5fr_1fr] h-screen">
      <div className = "flex flex-col justify-start items-center">
        <h1>{}</h1>
      </div>
      <div className="">

      </div>
    </div>
  )
}

export default Profile