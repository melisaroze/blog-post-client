import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);

	return(
		<Navbar variant="light" expand="lg" className="shadow-sm py-3 navbar">
			<Container fluid>
			    <Navbar.Brand as={Link} to="/">Special Journey</Navbar.Brand>
			    <Navbar.Toggle aria-controls="basic-navbar-nav" />
			    <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="ms-auto d-flex align-items-center gap-2">
				        <Nav.Link 
				        as={NavLink} 
				        to="/" 
				        exact="true">Home
				        </Nav.Link>
				        {(user.id !== null) 
                        
                            ? 
								<>
                                    <Nav.Link 
                                    as={NavLink} 
                                    to="/posts"
                                     exact="true">Blogs</Nav.Link>
									<Nav.Link 
									as={Link} 
									to="/logout">Logout
									</Nav.Link>
								</>
							: 
								<>
									<Nav.Link 
									as={Link} 
									to="/login">Login
									</Nav.Link>
									<Nav.Link 
									as={Link} 
									to="/register">Register
									</Nav.Link>
								</>
						}
				    </Nav>
			    </Navbar.Collapse>
			</Container>
		</Navbar>
		)
}