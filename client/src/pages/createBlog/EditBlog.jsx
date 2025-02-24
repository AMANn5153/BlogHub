import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useGetBlog from '../../hooks/Blog/useGetBlog';
import useBlogStore from '../../store/useBlogStore';
import useAuthContext from '../../context/authContext/useAuthContext';  
import CreateBlog from './CreateBlog';
import { useLocation } from 'react-router-dom';

const EditBlog = () => {
    const location = useLocation();
    const {auth} = useAuthContext();



    const {title, html, cover} = location.state || {};



    const [heading, setHeading] = useState(title || "");

    const [convertedContent, setConvertedContent] = useState(html || "");
    console.log(convertedContent);

    const [coverImage, setCoverImage] = useState(cover || "");

   
    useEffect(() => {
        localStorage.setItem(
          `user-${auth._id}-edit`,
          JSON.stringify({
            author: auth._id,
            title: heading,
            cover: coverImage,
            html: convertedContent,
          })
        );
      }, [heading, convertedContent, coverImage]);

    return (
        <CreateBlog 
        setConvertedContent={setConvertedContent}
        convertedContent={convertedContent}
        setHeading={setHeading}
        heading={heading}
        setCoverImage={setCoverImage}
        coverImage={coverImage}/>
    )
}

export default EditBlog;