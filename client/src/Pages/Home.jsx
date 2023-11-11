import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Home.css';
import Navbar from '../Component/Navbar/Navbar';
import Footer from "../Component/Footer/Footer";
import ParentInfo from "../Info/ParentInfo";

const Home = () => {
  //
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/home")
    .then((response) => response.json())
    .then((data) => {
        setContent(data.content);
        setTitle(data.book);
        setUser(data.message);
      })
    .catch((error) => console.error('Error:', error));
  }, []);

  return (
<div className="Home">
  <Navbar />
  <h1 id="h1">Welcome, {user}!</h1>
   <div className="welcome">
  <h2>{title}</h2>
  <p>{content}</p>

</div>
<ParentInfo />
<Footer />
</div>
);
}
export default Home
