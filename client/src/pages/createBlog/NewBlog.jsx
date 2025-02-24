import { useState, useEffect } from "react";
import useAuthContext from "../../context/authContext/useAuthContext";
import createBlog from "../../components/textEditor/CreateBlog";

const NewBlog = () => {
  const {auth} = useAuthContext();
  // blog already exists in the local storage
  const blog = JSON.parse(localStorage.getItem(`user-${auth._id}-Blog-1`));

  const [convertedContent, setConvertedContent] = useState(
    blog ? blog.html : ""
  );

  const [heading, setHeading] = useState(blog ? blog.title : "");

  const [coverImage, setCoverImage] = useState(blog ? blog.cover : "");

  // create and save blog to local storage
  useEffect(() => {
    localStorage.setItem(
      `user-${auth._id}-Blog-1`,
      JSON.stringify({
        author: auth._id,
        title: heading,
        cover: coverImage,
        html: convertedContent,
      })
    );
  }, [heading, convertedContent, coverImage]);
 
  return (
    <createBlog 
        setConvertedContent={setConvertedContent}
        convertedContent={convertedContent}
        setHeading={setHeading}
        heading={heading}
        setCoverImage={setCoverImage}
        coverImage={coverImage}

    />
  )
}

export default NewBlog