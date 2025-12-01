import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer'
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import SinglePost from './pages/SinglePost';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import UserProvider from './UserContext'

function App() {

    const [user, setUser] = useState({
      id: null,
      isAdmin: null
    });

    const unsetUser = () => {

      localStorage.clear();

    };

    useEffect(() => {

    fetch('https://blog-post-api-alvarez.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data.user !== "undefined") {

        setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
        });

      } else {

        setUser({
          id: null,
          isAdmin: null
        });

      }

    })

    }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        {<AppNavbar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        {<Footer />}
      </Router>
    </UserProvider>
  );
}

export default App;