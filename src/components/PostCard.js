import {useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; 

const notyf = new Notyf();

export default function PostCard({post, fetchData}) {

const { _id, title, content, author, creationDate, comments } = post;

const [updatedTitle, setupdatedTitle] = useState(title);
const [updatedContent, setupdatedContent] = useState(content);

const navigate = useNavigate();

const [isEditing, setIsEditing] = useState(false);


  function updatePost(id) {

    fetch(`https://blog-post-api-alvarez.onrender.com/posts/updatePost/${id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }, 
              body: JSON.stringify({
                title: updatedTitle,
                content: updatedContent
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data.error === "Error in Saving") {

            	notyf.error('Unsuccessful Blog Post Update'); 

            } else {

            	notyf.success(' Blog Post Updated');
          
              navigate("/posts")

            }

        })
    }

    function deletePost(id) {

            fetch(`https://blog-post-api-alvarez.onrender.com/posts/deletePost/${id}`,{

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) =>
          res.json().then((data) => ({
            status: res.status,
            data,
          }))
        )

        .then(({ status, data }) => {
          if (status === 403) {
            notyf.error("You are not allowed to delete this post.");

          } else if (status === 404) {
            notyf.error("Post not found.");

          } else if (status === 500) {
            notyf.error("Server error occurred.");

          } else if (status === 200) {
            notyf.success("Blog Post Deleted");
            setTimeout(() => notyf.dismissAll(), 800);
            fetchData();
            
          } else {
            notyf.error("Unexpected response from server.");
          }
        })
        .catch((err) => {
          console.error("Error deleting post:", err);
          notyf.error("Network or server error. Please try again later.");
        });
    }




return (
  <Card className="mt-3">
    <Card.Body>
      {/* Title and Fields */}
      {isEditing ? (
        <>
          <Form.Group className="mb-2">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              value={updatedTitle}
              onChange={(e) => setupdatedTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="string"
              value={updatedContent}
              onChange={(e) => setupdatedContent(e.target.value)}
            />
          </Form.Group>
        </>
      ) : (
        <>
          <Card.Title>Post Title:</Card.Title>
          <Card.Text>{updatedTitle}</Card.Text>
          <Card.Subtitle>Content:</Card.Subtitle>
          <Card.Text>{updatedContent}</Card.Text>
          <Card.Subtitle>Author:</Card.Subtitle>
          <Card.Text>{author}</Card.Text>
          <Card.Subtitle>Creation Date:</Card.Subtitle>
          <Card.Text>{creationDate}</Card.Text>
          <Card.Subtitle>Comments:</Card.Subtitle>
          <Card.Text>{comments.comment}</Card.Text>
        </>
      )}
    </Card.Body>

    <Card.Footer className="d-flex justify-content-around">
      <button
        className={`btn btn-${isEditing ? "success" : "primary"} btn-sm`}
        onClick={() => {
          if (isEditing) {
            updatePost(updatedTitle, updatedContent); 
          }
          setIsEditing(!isEditing);

        }}
      >
        {isEditing ? "Save" : "Update"}
      </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deletePost(_id)}
              >
                Delete
              </button>
    </Card.Footer>
  </Card>
)
};