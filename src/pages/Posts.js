import { useEffect, useState, useContext } from 'react';
import PostCard from '../components/PostCard';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Modal, Form, Container } from 'react-bootstrap';
import AddPost from './AddPost';


export default function Posts () {

	const { user } = useContext(UserContext); 
	const [Posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);


	const fetchData = () => {


		fetch('https://blog-post-api-alvarez.onrender.com/posts/getPosts', {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {

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


  return (
    <>
      {user ? (
        <Container className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-center flex-grow-1">Blog Posts</h1>
            <Button variant="success" onClick={() => setShowModal(true)}>
              + Add Blog Post
            </Button>
          </div>

          {Posts.length > 0 ? (
            <Row className="mt-4">
              {Posts.map(post => (
                <Col md={3} key={post._id}>
                  <PostCard post={post} 
                  fetchData={fetchData}/>

                </Col>
              ))}
            </Row>
          ) : (
            <h4 className="text-center mt-5">No Blog Posts Yet</h4>
          )}

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
                }}/>
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        <div className="text-center mt-5">
          <h3>You are not logged in</h3>
          <Link className="btn btn-primary mt-3" to="/login">
            Login to View
          </Link>
        </div>
      )}
    </>
  );
}












