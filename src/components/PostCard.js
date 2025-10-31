import { useState, useContext } from 'react';
import { Card, Form, ListGroup, Container, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate } from "react-router-dom";
import { Notyf } from 'notyf'; 

const notyf = new Notyf();

export default function PostCard({ post, fetchData, updatePost, handleEdit, deletePost }) {

  const { user } = useContext(UserContext); 
  const navigate = useNavigate();

  return (
    
    <Container 
      className="mb-4 post-card"
      style={{ cursor: "default" }}
      onClick={() => navigate(`/posts/${post._id}`)}
      >


    <div className="row align-items-center shadow-sm p-3 rounded bg-white">
      <div className="col-lg-6 mb-3 mb-lg-0">
      <img
        src="https://placehold.co/600x300/f8e1f4/333?text=No+Image"
        className="img-fluid rounded"
        alt="Placeholder"
        />
      </div>

      <div className="col-lg-6">
        <h4>{post.title}</h4>
        <p className="truncate-text">{post.content}</p>

        <div className="d-flex justify-content-between text-muted small">
        <p>By: {post.author?.userName || "Unknown"}</p>
        <p>{new Date(post.creationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</p>
        </div>
        

        <p>{post.comments}</p>

        { user && user.id === post.author._id && (
        <div className="d-flex gap-2 mt-3">
          <Button
            variant="link"
            size="sm"
            className="p-0 text-primary text-decoration-underline"
            onClick={() => handleEdit(post._id)} 
          >
           Update
          </Button>

          <Button
            variant="link"
            size="sm"
            className="p-0 text-danger text-decoration-underline"
            onClick={() => deletePost(post._id)} 
          >
            Delete
          </Button>
        </div>
        )}

      </div>
      </div>
    </Container>
  );
}