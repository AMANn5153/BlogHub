import { useParams } from "react-router-dom";
import useGetCommentThread from "../../hooks/Comment/useGetCommentThread";
import useCommentStore from "../../store/useCommentStore";
import CommentCard from "../../components/Card/CommentCard";

const CommentThread = () => {
    const {id} = useParams();
    const {commentThreadLoading} = useGetCommentThread({id});
    const {comments} = useCommentStore();
    console.log(comments);

    return (
        <>
        {
            commentThreadLoading?<div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>:
            <>
            <div className= "text-6xl text-cyan-400 m-10">
                <h1>Comment Threads ({comments[0]?.replies.length})</h1>
                <hr className=" m-10"/>
            </div>
                <CommentCard comment = {comments[0]}/>
            {comments[0]?.replies.map((comment, index)=>{
                return (
                    <>
                    <div className="hover:cursor-pointer m-8">
                        <CommentCard key={index} comment={comment}/>    
                    </div>
                    </>
                )
            })}
            </>
        }
        </>
    )
}

export default CommentThread;