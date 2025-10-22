import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom'; 
import { Notyf } from 'notyf'; 
import UserContext from '../UserContext';

export default function Login() {

const notyf = new Notyf();

const { user, setUser } = useContext(UserContext);

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [isActive, setIsActive] = useState(true);

const navigate = useNavigate();


    function authenticate(e) {

        e.preventDefault();
		fetch('https://blog-post-api-alvarez.onrender.com/users/login',{

		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({

			email: email,
			password: password

		})
	})
	.then(res => res.json())
	.then(data => {
		
		if(data.access !== undefined){

			console.log(data.access);

			localStorage.setItem('token', data.access);
			retrieveUserDetails(data.access);

			notyf.success('Successful Login'); 

			 navigate("/");
		
		} else if(data.message === "Incorrect email or password") {

			notyf.error("Incorrect Credentials. Try again.")

		} else {
			notyf.error('User Not Found. Try Again.');
		}
	})

	setEmail('');
	setPassword('');

    }


    const retrieveUserDetails = (token) => {

        fetch('https://blog-post-api-alvarez.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {

        	console.log(data);
        	console.log(data.user._id);

            setUser({
              id: data.user._id,
            });

        })

    };

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
    	// (user.id !== null) ?

		// 	<Navigate to="/" />

		//	:
	    	<Container className="d-flex align-items-center justify-content-center min-vh-100">
 			     <Row className="w-100 justify-content-center">
    			    <Col xs={12} sm={10} md={8} lg={5}>
     			     <Card className="shadow-lg border-0 rounded-4 p-4">
      			      <Card.Body>
	   			     <Form onSubmit={(e) => authenticate(e)}>
	  		     	<h1 className="my-5 text-center">Login</h1>


	            <Form.Group controlId="userEmail">
	                <Form.Label>Email address</Form.Label>
	                <Form.Control 
	                    type="text"
	                    placeholder="Enter email"
	                    value={email}
            			onChange={(e) => setEmail(e.target.value)}
	                    required
	                />
	            </Form.Group>

	            <Form.Group controlId="password">
	                <Form.Label>Password</Form.Label>
	                <Form.Control 
	                    type="password" 
	                    placeholder="Password"
	                    value={password}
            			onChange={(e) => setPassword(e.target.value)}
	                    required
	                />
	            </Form.Group>

	             { isActive ? 
	                <Button variant="primary" type="submit" id="submitBtn">
	                    Submit
	                </Button>
	                : 
	                <Button variant="danger" type="submit" id="submitBtn" disabled>
	                    Submit
	                </Button>
	            }
	        </Form>
	       </Card.Body>
         </Card>
        </Col>
      </Row>
    </Container>
    )
}