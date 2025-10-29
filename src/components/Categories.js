import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link} from 'react-router-dom';
import UserContext from '../UserContext';

export default function Categories() {

	const { user } = useContext(UserContext);

	return(
		<div className="shadow-sm py-3 categories">
			<Container fluid>
				    <div className="ms-auto d-flex justify-content-center gap-5">

				    	<Link
				    	className="categories-link" 
				        as={Link} 
				        to="/" 
				        exact="true">All Categories
				        </Link>

				        <Link
				        className="categories-link"  
				        as={Link} 
				        to="/" 
				        exact="true">Parenting
				        </Link>

				        <Link 
				        className="categories-link" 
				        as={Link} 
				        to="/" 
				        exact="true">Health
				        </Link>

				         <Link 
				         className="categories-link" 
				        as={Link} 
				        to="/" 
				        exact="true">Education
				        </Link>

				         <Link
				         className="categories-link"  
				        as={Link} 
				        to="/" 
				        exact="true">Inspiration
				        </Link>
				        
				    </div>
			</Container>
		</div>
		)
}