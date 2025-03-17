import useAuthFetch from "../../utils/authFetch";

const useViewsBlogs = () => {
    const views = async ({id, userId}) =>{
        try{
            await fetch(`${process.env.REACT_APP_API_URL}/views/updateViews?blogId=${id}&userId=${userId}`, {
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
