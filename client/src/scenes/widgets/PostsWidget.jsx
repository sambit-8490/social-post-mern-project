import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // ✅ Use env variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const getPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error("Failed to fetch posts:", response.statusText);
        return;
      }

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error("Failed to fetch user posts:", response.statusText);
        return;
      }

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isProfile]);

  if (!posts || posts.length === 0) return <p>No posts found.</p>;

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
