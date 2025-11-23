import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function PostCounts() {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = () => {
    fetch("https://blog-post-api-alvarez.onrender.com/posts/postCounts")
      .then((res) => res.json())
      .then((data) => {
        if (data.users && Array.isArray(data.users)) {
          setAuthors(data.users);
        }
      })
      .catch((err) => console.error("Error fetching authors:", err));
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="container">
      <h4 className="mb-2 text-start">Authors</h4>

      {authors.length > 0 ? (
        <Table bordered hover responsive className="shadow-sm post-table text-center">
          <thead>
            <tr>
              <th>Author</th>
              <th>Number of Posts</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td>{author.userName}</td>
                <td>{author.postCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted text-center">No authors found.</p>
      )}
    </div>
  );
}