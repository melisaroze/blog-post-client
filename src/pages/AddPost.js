import {useState, useEffect, useContext} from 'react';
import {Form, Button, Container, Spinner} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; 
import UserContext from '../UserContext';

const notyf = new Notyf();

export default function AddPost({onSuccess}){

const navigate = useNavigate();

const {user} = useContext(UserContext);

const [title , setTitle] = useState("");
const [content, setContent] = useState("");
const [image, setImage] = useState(null);
const [isUploading, setIsUploading] = useState(false);


const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true); // start animation

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://blog-post-api-alvarez.onrender.com/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Uploaded:", data.imageUrl);

      setImage(data.imageUrl); // store Cloudinary URL
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false); // stop animation
    }
  };

	function createPost(e){

		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch('https://blog-post-api-alvarez.onrender.com/posts/addPost', {

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({

				title: title,
				content: content,
				image: image,

			})
		})
		.then(res => res.json())
		.then(data => {

            if (data.error === "Failed to save the blog post") {


            notyf.error('Unsuccessful Blog Post Creation');

			} else {

			notyf.success('Blog Post Added');

			 navigate("/posts");

			}

		})

        setTitle("")
        setContent("")

        if (typeof onSuccess === "function") {
            onSuccess(); 
        }
	}

return user.id ? (
  <Container>
    <h1 className="my-5 text-center">Add Blog Post</h1>

    <input type="file" onChange={handleFileUpload} className="mb-2" />

    {/* Upload animation */}
    {isUploading && (
      <div className="my-3 text-center">
        <Spinner animation="border" role="status" />
        <p>Uploading...</p>
      </div>
    )}

    {/* Show uploaded image */}
    {image && !isUploading && (
      <div className="text-center my-3">
        <img src={image} alt="Uploaded" style={{ maxWidth: "300px" }} />
      </div>
    )}

    <Form onSubmit={(e) => createPost(e)}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          className="mb-2"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Content:</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter Content"
          style={{ height: "150px" }}
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="my-5">
        Submit
      </Button>
    </Form>
  </Container>
) : (
  <Navigate to="/posts" />
);
};