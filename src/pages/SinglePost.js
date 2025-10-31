import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function SinglePostPage() {
  const { id } = useParams(); // 👈 get post ID from URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://blog-post-api-alvarez.onrender.com/posts/getPost/${id}`) // your backend route for single post
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <h2>{post.title}</h2>
      <p className="text-muted">
        By {post.author?.userName || "Unknown"} •{" "}
        {new Date(post.creationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
      </p>
      <img
        src="https://placehold.co/800x400/f8e1f4/333?text=No+Image"
        className="img-fluid rounded mb-3"
        alt="Post cover"
      />
      <p>{post.content}</p>
    </Container>
  );
}
