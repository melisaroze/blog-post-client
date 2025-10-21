import { Button, Row, Col, Container, Footer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Notyf } from 'notyf'; 

const notyf = new Notyf();

export default function Home() {


return (
    <>
    <div className="homepage">
        <Container fluid className="p-0 d-flex justify-content-center align-items-center text-center" >
        <Row className="w-100 m-0">
            <Col>
                <h1>Blog Post Management App</h1>
                <p>Create, Read, Update and Delete Blog Post</p>
                <Link className="btn cta" to={"/posts"}>Check your blog posts</Link>
            </Col>
        </Row>
       </Container>
    </div>

        <footer className="text-light text-center mt-auto">
                <p className="mb-1">© {new Date().getFullYear()} Blog Post Management</p>
          </footer>
      
      </>
    )
}