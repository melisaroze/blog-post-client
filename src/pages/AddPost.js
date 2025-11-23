import {useState, useEffect, useContext} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; 
import UserContext from '../UserContext';

const notyf = new Notyf();

export default function AddPost({onSuccess}){

const navigate = useNavigate();

const {user} = useContext(UserContext);

const [image, setImage] = useState(null);
const [title , setTitle] = useState("");
const [content, setContent] = useState("");

const handleFileUpload = async (e) => {
	const file = e.target.files[0];
	const formData = new FormData();
	formData.append("image", file);

	const res = await fetch("https://blog-post-api-alvarez.onrender.com/upload/image", {
	      method: "POST",
	      body: formData,
	    });

	    const data = await res.json();
	    console.log("Uploaded:", data.imageUrl);

	    setImage(data.imageUrl); // store Cloudinary URL
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

	return (

            (user.id)
            ?
            <>
            <Container>
                <h1 className="my-5 text-center">Add Blog Post</h1>

                <input type="file" onChange={handleFileUpload} className="mb-2"/>

                <div className="my-3 d-flex justify-content-center">
                {image && <img src={image} alt="preview" height="200" width="300" />}
                </div>

                <Form onSubmit={e => createPost(e)}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control 
                        	type="text" 
                        	placeholder="Enter Title"
                        	className="mb-2" 
                        	required value={title} onChange={e => {setTitle(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control 
                        	as="textarea" 
                        	placeholder="Enter Content"
                        	style={{ height: "150px" }} 
                        	rows={5} 
                        	onChange={e => {setContent(e.target.value)}}
                        	/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </Container>
		    </>
            :
            <Navigate to="/posts" />

	)


}