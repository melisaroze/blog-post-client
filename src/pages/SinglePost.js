import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Notyf } from 'notyf'; 
import UserContext from '../UserContext';
import {useContext } from 'react';
import RelatedPosts from '../components/RelatedPosts';

const notyf = new Notyf();

export default function SinglePostPage({fetchData, likePost}) {

  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const { id } = useParams(); // 👈 get post ID from URL
  const [post, setPost] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://blog-post-api-alvarez.onrender.com/posts/getPost/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <p>Loading...</p>;


      function likePost(id) {
        fetch(`https://blog-post-api-alvarez.onrender.com/posts/likePost/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(() => {
          notyf.success("Updated like");

          // ✅ INSTANT UI UPDATE (NO REFRESH)
          setPost(prev => {
            const alreadyLiked = prev.likes.includes(user.id);

            return {
              ...prev,
              likes: alreadyLiked
                ? prev.likes.filter(id => id !== user.id)
                : [...prev.likes, user.id]
            };
          });
        })
        .catch(() => {
          notyf.error("Error liking post");
        });
      }

           function addComment(postId) {
            fetch(`https://blog-post-api-alvarez.onrender.com/posts/addComment/${postId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({ comment })
            })
              .then(res => res.json())
              .then(data => {
                notyf.success("Comment added");

                // 🔥 USE BACKEND RESPONSE (IMPORTANT)
                setPost(data.updatedPost);

                setComment("");
              })
              .catch(() => notyf.error("Error adding comment"));
          }

        
      function deleteComment(postId, commentId) {
        fetch(`https://blog-post-api-alvarez.onrender.com/posts/deleteComment/${postId}/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(() => {
            notyf.success("Comment deleted");

            // ✅ INSTANT UI UPDATE
            setPost(prev => ({
              ...prev,
              comments: prev.comments.filter(c => c._id !== commentId)
            }));
          })
          .catch(() => notyf.error("Error deleting comment"));
      }

      function editComment(postId, commentId) {
        fetch(`https://blog-post-api-alvarez.onrender.com/posts/editComment/${postId}/${commentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ comment: editText })
        })
          .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(() => {
            notyf.success("Comment updated");

            // ✅ INSTANT UI UPDATE
            setPost(prev => ({
              ...prev,
              comments: prev.comments.map(c =>
                c._id === commentId
                  ? { ...c, comment: editText }
                  : c
              )
            }));

            setEditingCommentId(null);
            setEditText("");
          })
          .catch(() => notyf.error("Error updating comment"));
      }

return (
  <>
    <Container className="mt-4">
      <h2>{post.title}</h2>
      <p className="text-muted">
        By {post.author?.userName || "Unknown"} •{" "}
        {new Date(post.creationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
      </p>
      <div className="d-flex justify-content-center">
      {post.image && (
        <Card.Img 
          variant="top"
          className="my-4 blog-image" 
          src={post.image} 
          alt={post.title} 
          style={{ height: "auto", width: "300px", objectFit: "cover" }} 
        />
      )}
      </div>
      <p className="post-spacing">{post.content}</p>
    </Container>


    <Container>
     <div className="d-flex align-items-center gap-2 m-3">

        {/* LIKE BUTTON */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => likePost(post._id)}
        >
          ❤️ {post.likes?.length || 0}
        </Button>

        {/* COMMENT INPUT */}
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: 1
          }}
        />

        <Button
          variant="primary"
          size="sm"
          onClick={() => addComment(post._id)}
        >
          Leave a comment
        </Button>

      </div>

      <div className="m-4">
  <h5>Comments</h5>

  {post.comments?.length > 0 ? (
    post.comments.map((c) => {
      const userId = user?.id;
      const isOwner = 
          typeof c.user === "object"
            ? c.user._id === user.id || c.user._id === user._id
            : c.user === user.id;

      const isAdmin = localStorage.getItem("user.isAdmin") === "true";

      return (
        <div key={c._id} className="border rounded p-2 mb-2">

        <strong>{c.userName || c.user?.userName || "User"}</strong>

          {/* EDIT MODE */}
          {editingCommentId === c._id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <Button
                size="sm"
                onClick={() => editComment(post._id, c._id)}
              >
                Save
              </Button>
            </>
          ) : (
            <p>{typeof c.comment === "string" ? c.comment : ""}</p>
          )}

          {/* ACTIONS */}
          {(isOwner || isAdmin) && (
            <div className="d-flex gap-2">
              
              {/* EDIT (OWNER ONLY) */}
              {isOwner && (
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => {
                    setEditingCommentId(c._id);
                    setEditText(c.comment);
                  }}
                >
                  Edit
                </Button>
              )}

              {/* DELETE (ADMIN OR OWNER) */}
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteComment(post._id, c._id)}
              >
                Delete
              </Button>

            </div>
          )}
        </div>
      );
    })
  ) : (
    <p className="text-muted">No comments yet</p>
  )}
</div>
</Container>
    <Container>
    <RelatedPosts currentPost={post}/>
    </Container>
  </>
  );
}
