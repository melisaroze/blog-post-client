import { useEffect, useState } from "react";
import { Card, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function MyPostsPage({ post }) {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 5;

  const fetchData = () => {

		fetch('https://blog-post-api-alvarez.onrender.com/posts/getMyPosts', {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {
      console.log("🔥 Frontend fetched data:", data);

		    if (Array.isArray(data.posts)) {
        
        const sortedPosts = data.posts.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );

        setPosts(sortedPosts);
		    } else {
		    	setPosts([]);
		    }

		});
	}

    useEffect(() => {

		fetchData()

    }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div 
            key={post._id} 
            className="card p-3 mb-3 rounded shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/posts/${post._id}`)}>
            <div className="col-lg-12 mb-3 align-contents-center">
                {post.image && (
                  <Card.Img 
                    variant="top" 
                    src={post.image} 
                    alt={post.title} 
                    style={{ height: "180px", objectFit: "cover" }} 
                  />
                )}
            </div>

              <h4>{post.title}</h4>
              <small className="text-muted">
                <p>{new Date(post.creationDate).toLocaleDateString('en-US', {
                 year: 'numeric',
                 month: 'long',
                 day: 'numeric'
                })}</p>
              <p className="post-spacing truncate-text">{post.content}</p>
              </small>
          </div>
        ))
      )}

          <div className="d-flex justify-content-center mt-4">
             {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`btn btn-m mx-1 ${currentPage === index + 1 ? "pagination-btn btn-outline-dark" : "btn-outline-dark"}`}
                onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
              ))}
          </div>
    </Container>
  );
};

