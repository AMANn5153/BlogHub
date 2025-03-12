const setNewInfo = asyncHandler(async(req, res, next)=>{
    const {
        name,
        username,
        email,
        bio,
        website,
        workingAt,
        location,
        education} = req.body;




        const updateUser = await User.findOneAndUpdate({
            _id : new mongoose.Types.ObjectId(`${req.user._id}`)
        },{
            $set : {
                name,
            }
        })
    
});

exports.modules = {
    setNewInfo
}