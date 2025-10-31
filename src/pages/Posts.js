import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Modal, Form, Container, Table } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import Categories from '../components/Categories';
import PopularPosts from '../components/PopularPosts'
import UserContext from '../UserContext';
import AddPost from './AddPost';
import { Notyf } from 'notyf'; 

const notyf = new Notyf();


export default function Posts ({post}) {

const { user } = useContext(UserContext); 
const [Posts, setPosts] = useState([]);
const [showModal, setShowModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);
const [updatedTitle, setUpdatedTitle] = useState("");
const [updatedContent, setUpdatedContent] = useState("");
const [comment, setComment] = useState("");
const [comments, setComments] = useState("");


const fetchData = () => {


		fetch('https://blog-post-api-alvarez.onrender.com/posts/getPosts', {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {
      console.log("🔥 Frontend fetched data:", data);

		    if (typeof data.message !== "string") {
		    	setPosts(data.posts);
		    } else {
		    	setPosts([]);
		    }

		});
	}

    useEffect(() => {

		fetchData()

    }, []);


function handleEdit(post) {
    console.log("Clicked Edit — post object:", post);
  setSelectedPost(post);
  setUpdatedTitle(post.title);
  setUpdatedContent(post.content);
  setShowEditModal(true);
}

  function updatePost(id) {

    console.log("Updating post:", id, updatedTitle, updatedContent);

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
        .then((res) =>
          res.json().then((data) => ({
            status: res.status,
            data,
          }))
        )

        .then(({ status, data }) => {
          if (status === 403) {
            notyf.error("You are not allowed to update this post.");

          } else if (status === 404) {
            notyf.error("Post not found.");

          } else if (status === 500) {
            console.log(user)
            notyf.error("Server error occurred.");

          } else if (status === 200) {
            notyf.success("Blog Post Updated");
            setTimeout(() => notyf.dismissAll(), 800);
            fetchData();
            
          } else {
            notyf.error("Unexpected response from server.");
          }
        })
        .catch((err) => {
          console.error("Error updating post:", err);
          notyf.error("Network or server error. Please try again later.");
        });
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

    function addComment(id) {

            fetch(`https://blog-post-api-alvarez.onrender.com/posts/addComment/${id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }, 
              body: JSON.stringify({
                comment: comments
            })
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


        function deleteComment(id) {

            fetch(`https://blog-post-api-alvarez.onrender.com/posts/deleteComment/${id}`,{

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
    <>
      <Categories />

      <Container className="mt-5">
        {user ? (
          <>
            {user.isAdmin ? (
              // ✅ ADMIN DASHBOARD
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="text-center flex-grow-1">Admin Dashboard</h1>
                </div>

                {Posts.length > 0 ? (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Comments</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Posts.map((post) => (
                        <tr key={post._id}>
                          <td>{post.title}</td>
                          <td>{post.content}</td>
                          <td>{post.author?.userName || "Unknown"}</td>
                          <td>{post.comments}</td>
                          <td>
                            {new Date(post.creationDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td>
                            <Button variant="primary" size="sm" onClick={() => handleEdit(post)}>
                              Edit
                            </Button>{" "}
                            <Button variant="danger" size="sm" onClick={() => deletePost(post._id)}>
                              Delete
                            </Button>{" "}
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => deleteComment(post._id)}
                            >
                              Delete Comment
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h4 className="text-center mt-5">No Blog Posts Yet</h4>
                )}
              </>
            ) : (
              // ✅ USER VIEW (CARDS)
              <>
                <div className="d-flex justify-content-between align-items-center ">
              
{/*                   {user && (
                    <Button variant="success" onClick={() => setShowModal(true)}>
                      + Add Blog Post
                    </Button>
                  )}*/}
                </div>

                <Row className="mt-4">


                  {/* ✅ LEFT COLUMN - POSTS */}
                  <Col lg={8}>
                  <h4 className="text-start flex-grow-1">Latest Blog Posts</h4>

                    {Posts.length > 0 ? (
                      <Row>
                        {Posts.map((post) => (
                          <Col md={12} key={post._id}>
                            <PostCard
                              post={post}
                              fetchData={fetchData}
                              handleEdit={handleEdit}
                              updatePost={updatePost}
                              deletePost={deletePost}
                            />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <h4 className="text-center mt-5">No Blog Posts Yet</h4>
                    )}
                  </Col>

                  {/* ✅ RIGHT COLUMN - SIDEBAR */}
                  <Col lg={4}>
                        <PopularPosts />
                  </Col>
                </Row>
              </>
            )}
          </>
        ) : (
          // ✅ PUBLIC VIEW (Not Logged In)
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="text-center flex-grow-1">Blog Posts</h1>
            </div>

            <Row className="mt-4">
              <Col lg={8}>
                {Posts.length > 0 ? (
                  <Row>
                    {Posts.map((post) => (
                      <Col md={12} key={post._id}>
                        <PostCard
                          post={post}
                          fetchData={fetchData}
                          handleEdit={handleEdit}
                          updatePost={updatePost}
                          deletePost={deletePost}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <h4 className="text-center mt-5">No Blog Posts Yet</h4>
                )}
              </Col>

              <Col lg={4}>
                <div className="bg-light rounded">
                  <PopularPosts />
                  
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* 🧩 Add Post Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPost
            onSuccess={() => {
              setShowModal(false);
              fetchData();
            }}
          />
        </Modal.Body>
      </Modal>

      {/* 🧩 Edit Post Modal */}
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
                  updatePost(selectedPost._id);
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
