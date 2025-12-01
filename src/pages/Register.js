import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf'; 
import UserContext from '../UserContext';

export default function Register() {

	const notyf = new Notyf();

	const {user} = useContext(UserContext);

	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);


	console.log(email);
	console.log(password);
	console.log(confirmPassword)


	function registerUser(e) {

		// Prevents page redirection via form submission
		e.preventDefault();

		fetch('https://blog-post-api-alvarez.onrender.com/users/register',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

            	userName: userName,
                email: email,
                password: password

            })

		})
		.then(res => res.json())
		.then(data => {

		if(data.message === "Registered Successfully"){


		
			setEmail('');
			setPassword('');
			setConfirmPassword('');

			notyf.success('Registration Successful'); 

		} else if (data.error === "Password must be atleast 8 characters") {

			notyf.error("Password must be atleast 8 characters")

		} else {
			
			notyf.error('Registration Failed.'); 
		}

		})
	}
    


	useEffect(()=>{

		if((email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

	},[email, password, confirmPassword])

	return (

		(user.id !== null) ?
		    <Navigate to="/" />
		:
			<Container className="d-flex align-items-center justify-content-center min-vh-100">
    	  		<Row className="w-100 justify-content-center">
        		<Col xs={12} sm={10} md={8} lg={5}>
          		<Card className="shadow-lg border-0 rounded-4 p-4">
            	<Card.Body>

					<Form onSubmit={(e) => registerUser(e)}>
					<h1 className="my-5 text-center">Register</h1>

				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control 
					className="mb-2"
					type="username"
					placeholder="Enter Username" 
					required 
					value={userName} 
					onChange={e => {setUserName(e.target.value)}}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
					className="mb-2"
					type="email"
					placeholder="Enter Email" 
					required 
					value={email} 
					onChange={e => {setEmail(e.target.value)}}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control
					className="mb-2" 
					type="password" 
					placeholder="Enter Password" 
					required 
					value={password} 
					onChange={e => {setPassword(e.target.value)}}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm Password:</Form.Label>
					<Form.Control 
					className="mb-2"
					type="password" 
					placeholder="Confirm Password"
					className="mb-3" 
					required 
					value={confirmPassword} 
					onChange={e => {setConfirmPassword(e.target.value)}}/>
				</Form.Group>
				{
					isActive

					? <Button
						className="submit-button"  
						variant="primary" 
						type="submit">Create an account</Button>
					: <Button 
						className="submit-button" 
						variant="primary" 
						disabled>Create an account</Button>
				}			 


				<p className="mt-4 d-flex justify-content-center gap-1">
			 	Already have an account?
			 	<Link to="/login"> Log-in</Link> here
			 </p>

			 </Form>
			</Card.Body>
       	</Card>
      </Col>
     </Row>
    </Container>
		
		)
}