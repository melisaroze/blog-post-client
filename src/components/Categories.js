import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link} from 'react-router-dom';
import UserContext from '../UserContext';

export default function Categories() {

	const { user } = useContext(UserContext);
	const [posts, setPosts] = useState([]);
	const [keyword, setKeyword] = useState("");

return (
  <>
    <div className="shadow-sm py-3 categories">
      <Container fluid>
        {/* 🔍 Search Bar */}
        <div className="d-flex justify-content-center m-2">
          <Form className="mb-4 w-100">
            <Form.Control
              type="text"
              placeholder="Search by title or content..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="p-3 rounded-3 shadow-sm"
            />
          </Form>
        </div>

        {/* 📚 Category Links */}
        <div className="ms-auto d-flex justify-content-center gap-5">
          <Link className="categories-link" to="/" exact="true">
            All Categories
          </Link>
          <Link className="categories-link" to="/" exact="true">
            Parenting
          </Link>
          <Link className="categories-link" to="/" exact="true">
            Health
          </Link>
          <Link className="categories-link" to="/" exact="true">
            Education
          </Link>
          <Link className="categories-link" to="/" exact="true">
            Inspiration
          </Link>
        </div>
      </Container>
    </div>
  </>
);
}
