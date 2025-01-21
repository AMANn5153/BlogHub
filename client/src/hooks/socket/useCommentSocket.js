import {useEffect} from "react";
import useSocketContext from "../../context/socket/useSocket";
import useCommentStore from "../../store/useCommentStore";


const useCommentSocket = () =>{
    const {comments, setComment} = useCommentStore();
    const {socket} = useSocketContext();

    useEffect(()=>{
        if(socket){
            socket?.on("newComment", (comment)=>{
                setComment((prevComments) => [...prevComments, comment]);
            })
        }

        return ()=> socket?.off("newComment")
    },[setComment, comments, socket]);

}

export default useCommentSocket;
