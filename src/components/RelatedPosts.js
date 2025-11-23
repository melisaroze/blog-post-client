import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function RelatedPosts({currentPost}) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

   useEffect(() => {
    if (!currentPost) return;

    fetch("https://blog-post-api-alvarez.onrender.com/posts/getPosts")
      .then((res) => res.json())
      .then((data) => {
        if (!data.posts) return;

        // Exclude current post
        const filtered = data.posts.filter(post => post._id !== currentPost._id);

        // Split current post content into keywords safely
        const keywords = currentPost.content
          ? currentPost.content.toLowerCase().split(" ")
          : [];

        // Filter posts where content includes any keyword
        const related = filtered.filter(post =>
          post.content &&
          keywords.some(kw => post.content.toLowerCase().includes(kw))
        );

        // Sort by newest first
        const sorted = related.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );

        // Take top 3 related posts
        setPosts(sorted.slice(0, 3));
      })
      .catch(err => console.error("Error fetching related posts:", err));
  }, [currentPost]);

  if (posts.length === 0) return null; // no related posts
  return (
    <div className="container mt-5">
      <h4 className="mb-4 text-start">Related Posts</h4>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={4} className="mb-4" key={post._id}>
              <Card 
                className="h-100 shadow-sm border-0"       
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/posts/${post._id}`)}>
                <Card.Body>

                 {post.image && (
                    <Card.Img 
                      variant="top" 
                      src={post.image} 
                      alt={post.title} 
                      style={{ height: "180px", objectFit: "cover" }} 
                    />
                  )}
                    <small className="text-muted">
                        {new Date(post.creationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                    </small>
                  <Card.Title>{post.title}</Card.Title>

                  <Card.Text>
                    {post.content.length > 100
                      ? post.content.slice(0, 100) + "..."
                      : post.content}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="bg-transparent border-0 text-start">
                  <Card.Subtitle className="text-muted mb-2"> 
                   By {post.author?.userName || "Unknown Author"}
                  </Card.Subtitle>
                </Card.Footer>

              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No posts available yet.</p>
        )}
      </Row>
    </div>
  );
}
