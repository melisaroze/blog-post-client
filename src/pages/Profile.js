import React, { useEffect, useState } from "react";

export default function ProfilePage () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("https://blog-post-api-alvarez.onrender.com/users/details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // remove if your route is public
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load profile.");
      }

      const data = await response.json();
      setUser(data.user);   // adjust based on your API response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading profile...</p>;

  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>

      <div className="card p-4 shadow-sm">
        <h4>{user.userName}</h4>
        <p>Email: {user.email}</p>

      </div>
    </div>
  );
};

