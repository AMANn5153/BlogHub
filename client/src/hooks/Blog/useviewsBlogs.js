import useAuthFetch from "../../utils/authFetch";

const useViewsBlogs = () => {
    const {authFetch} = useAuthFetch
    const views = async ({id, userId}) =>{
        try{
            await authFetch(`http://localhost:3001/api/v1/views/updateViews?blogId=${id}&userId=${userId}`, {
                method : "POST",
            });
        }
        catch(err){
            console.log(err);
        }
    }
    return {views};
}

export default useViewsBlogs;
