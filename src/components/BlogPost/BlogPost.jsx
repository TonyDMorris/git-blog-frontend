import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { GetGitBlogPostByID } from "../../StrapiClient/strapi";
import { useParams } from "react-router-dom";
import { useRemark } from "react-remark";
import { FaAccessibleIcon } from "react-icons/fa";

export default function BlogPost() {
  const params = useParams();

  const postID = params.id;
  const [postContent, setBlogContentMarkdownSource] = useRemark();
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(null);
  const { auth, isAuthenticating } = useContext(AuthContext);

  useEffect(() => {
    const getPost = async () => {
      const newGitBlogPost = await GetGitBlogPostByID(postID, auth?.jwt || "");
      if (newGitBlogPost.error) {
        setError(newGitBlogPost.error);
        return;
      }
      setBlogPost(newGitBlogPost);
      setBlogContentMarkdownSource(newGitBlogPost.data.attributes.body);
    };
    if (auth || !isAuthenticating) {
      getPost();
    }
  }, [postID, auth, isAuthenticating, setBlogContentMarkdownSource]);

  return (
    <div className="flex justify-center items-center">
      {error && <h1 className="text-2xl font-bold">{error}</h1>}
      {blogPost && (
        <div className="flex flex-col p-6 max-w-screen-2xl self-center items-center justify-center bg-slate-900 gap-4 rounded shadow-2xl">
          <h1 className="text-4xl text-center font-extrabold tracking-tight leading-none md:text-5xl xl:text-8xl">
            {blogPost?.data.attributes.title}
          </h1>
          <div className="hidden flex-col sm:flex lg:flex-row gap-2  justify-center items-center">
            <div className="flex gap-2">
              <FaAccessibleIcon className="text-2xl mr-2" />
              <span> Created: {blogPost.data.attributes.createdAt}</span>
            </div>
            <div className="flex gap-2">
              <FaAccessibleIcon className="text-2xl mr-2" />
              <span> Updated: {blogPost.data.attributes.updatedAt}</span>
            </div>
          </div>
          <div className="max-w-screen-xl p-4  self-center">{postContent}</div>
        </div>
      )}
    </div>
  );
}
