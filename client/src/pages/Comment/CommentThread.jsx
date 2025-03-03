import { useParams } from "react-router-dom";
import useGetCommentThread from "../../hooks/Comment/useGetCommentThread";
import useCommentStore from "../../store/useCommentStore";
import CommentCard from "../../components/Card/CommentCard";
import { Link } from "react-router-dom";

const CommentThread = () => {
    const {name, blogId, id} = useParams();

    const {commentThreadLoading} = useGetCommentThread({id});
    const {comments} = useCommentStore();
    
    if(comments.length === 0) {return <div className="flex w-full h-full items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
    </div>}
    return (
        <>
        {
            commentThreadLoading?<div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>:
            <>
            <div className= "text-6xl bg-gradient-to-br from-white to-stone-100 text-cyan-400 m-10">
                <Link to={`/blog/${blogId}`}><h1 className="text-4xl font-bold">{name}</h1></Link> 
                <h1 className="text-xl font-bold">Comment Threads ({comments[0]?.replies.length})</h1>
                <hr className=" m-10"/>
            </div>
                <CommentCard comment = {comments[0]} blog={{heading : name,  id : blogId}}/>

            {comments[0]?.replies.map((comment, index)=>{
                return (
                    <>
                    <div className="hover:cursor-pointer m-8">
                        <CommentCard key={index} comment={comment}  blog={{heading : name,  id : blogId}}/>
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