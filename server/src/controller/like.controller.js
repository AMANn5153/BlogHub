const asyncHandler = require("../utils/asyncHandler");

const toggleLike = asyncHandler(async (req, res) => {
    const {blogId, commentId} = req.body;

    if(!blogId && !commentId){
        return res.status(400).json({message:"Please provide blogId or commentId"});
    }

    const like = await Likes.findOne({
        $or: [
            {blogId : blogId},
            {commentId : commentId}
        ]
    });

    


});
