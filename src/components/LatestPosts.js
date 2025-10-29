import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function LatestPosts() {
  const [posts, setPosts] = useState([]);

  const fetchLatestPosts = () => {
    fetch("https://blog-post-api-alvarez.onrender.com/posts/getPosts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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
    <div className="container mt-5">
      <h2 className="mb-4 text-start">Latest Blog Posts</h2>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={4} className="mb-4" key={post._id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>

                      <img
                        src="https://placehold.co/600x300/f8e1f4/333?text=No+Image"
                        className="img-fluid rounded"
                        alt="Placeholder"
                        />
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
                    {post.author?.userName || "Unknown Author"}
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
