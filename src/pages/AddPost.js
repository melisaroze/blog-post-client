import {useState,useEffect, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; 
import UserContext from '../UserContext';

const notyf = new Notyf();

export default function AddPost({ onSuccess}){

const navigate = useNavigate();

const {user} = useContext(UserContext);

const [title , setTitle] = useState("");
const [content, setContent] = useState("");

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
				content: content

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
                <h1 className="my-5 text-center">Add Blog Post</h1>
                <Form onSubmit={e => createPost(e)}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" required value={title} onChange={e => {setTitle(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" placeholder="Enter Content" required value={content} onChange={e => {setContent(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
		    </>
            :
            <Navigate to="/posts" />

	)


}