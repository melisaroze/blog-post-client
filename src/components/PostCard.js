import { useState, useContext } from 'react';
import { Card, Form, ListGroup, Container, Button, Modal } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate } from "react-router-dom";
import { Notyf } from 'notyf'; 

const notyf = new Notyf();

export default function PostCard({ post, fetchData, updatePost, handleEdit, deletePost }) {

  const { user } = useContext(UserContext); 
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
    <Container 
      className="mb-4 post-card"
      style={{ cursor: "default" }}
      onClick={() => navigate(`/posts/${post._id}`)}
      >


    <div className="row align-items-center shadow-sm p-3 rounded bg-white">
      <div className="col-lg-6 mb-3 mb-lg-0">
      {post.image && (
        <Card.Img 
          variant="top" 
          src={post.image} 
          alt={post.title} 
          style={{ height: "180px", objectFit: "cover" }} 
        />
      )}
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
            onClick={(e) => {
              e.stopPropagation();  
              setSelectedPost(post);
              setUpdatedTitle(post.title);
              setUpdatedContent(post.content);
              setShowEditModal(true);}
            }
          >
           Edit
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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => {
                  updatePost(selectedPost._id, {
                    title: updatedTitle,
                    content: updatedContent
                  })
                  setShowEditModal(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}