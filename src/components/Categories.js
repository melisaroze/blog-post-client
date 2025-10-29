import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Categories() {

	const { user } = useContext(UserContext);

	return(
		<Navbar variant="light" expand="lg" className="shadow-sm py-3 categories">
			<Container fluid>

				    <Nav className="ms-auto d-flex align-items-center gap-2">
				        <Nav.Link 
				        as={NavLink} 
				        to="/" 
				        exact="true">Parenting
				        </Nav.Link>

				        <Nav.Link 
				        as={NavLink} 
				        to="/" 
				        exact="true">Health
				        </Nav.Link>
				        

				    </Nav>
			</Container>
		</Navbar>
		)
}