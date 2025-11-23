import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import RelatedPosts from '../components/RelatedPosts';

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
  <>
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
      <div className="d-flex justify-content-center">
      {post.image && (
        <Card.Img 
          variant="top"
          className="my-4" 
          src={post.image} 
          alt={post.title} 
          style={{ height: "auto", width: "300px", objectFit: "cover" }} 
        />
      )}
      </div>
      <p>{post.content}</p>
    </Container>

    <Container>
    <RelatedPosts currentPost={post}/>
    </Container>
  </>
  );
}
