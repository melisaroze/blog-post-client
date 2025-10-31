import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function LatestPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchLatestPosts = () => {
    fetch("https://blog-post-api-alvarez.onrender.com/posts/getPosts")
      .then((res) => res.json())
      .then((data) => {

        if (data.posts && Array.isArray(data.posts)) {
          // Sort by newest creationDate and take top 3
          const sorted = [...data.posts].sort(
            (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
          );
          setPosts(sorted.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  return (
    <div className="container">
      <h4 className="mb-4 text-start">Popular Blog Posts</h4>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={12} className="mb-4" key={post._id}>
              <Card className="h-100 shadow-sm border-0"       
              	style={{ cursor: "pointer" }}
     			onClick={() => navigate(`/posts/${post._id}`)}>
                <Card.Body>

                      <img
                        src="https://placehold.co/600x300/f8e1f4/333?text=No+Image"
                        className="img-fluid rounded mb-2"
                        alt="Placeholder"
                        />

                  <Card.Title>{post.title}</Card.Title>

                  <Card.Text>
                    {post.content.length > 100
                      ? post.content.slice(0, 100) + "..."
                      : post.content}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="bg-transparent border-0 d-flex justify-content-between">
                  <Card.Subtitle className="text-muted mb-2"> 
                   By {post.author?.userName || "Unknown Author"}
                  </Card.Subtitle>

                    <Card.Subtitle className="text-muted">
                        {new Date(post.creationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
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
