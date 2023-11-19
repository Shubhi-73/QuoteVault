import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

import './Collection.css';

function Collection() {

  const [DeleteData, setDeleteData] = useState();


      const handleSignout = () => {
          setDeleteData(false)
      }


  const [data, setData] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
const navigate = useNavigate();

  useEffect(() => {
    fetch("https://back-quotevault.onrender.com/Collection")
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error('Error:', error));
  }, []);


  const deleteNote = async(noteId) => {
    try {
        // You can use axios to send the data to your server if needed.
        const response = await axios.post('https://back-quotevault.onrender.com/deleteData', {noteId});
        if(response.status === 200){
          window.location.reload();
          // navigate('/Collection');
        }
        else{
          document.getElementById("demo").innerHTML = "Please try again";
        }
    } catch (error) {
        console.error(error);
        // Handle the error (e.g., show an error message to the user).
    }
    };



  // const handleSubmit = async(e) => {
  //     e.preventDefault();
  //
  //     try {
  //         // You can use axios to send the data to your server if needed.
  //         const response = await axios.post('http://localhost:8000/deleteData', DeleteData);
  //         if(response.status === 200) navigate('/Home');
  //         else{
  //           document.getElementById("demo").innerHTML = "Please try again"
  //         }
  //     } catch (error) {
  //         console.error(error);
  //         // Handle the error (e.g., show an error message to the user).
  //     }
  //
  // };


      return (
        <div className='collectionPage'>
            <Navbar />
            <div className='collection'>

          <p className="filter">Filter according to tag</p>
          {/*<input type="text" id="tagValue" value="quote"></input>*/}
          <select id="tagValue" className="drop" onChange={(e) => setSelectedTag(e.target.value)}>
          {/* Add options for tag filtering */}
          <option value="">All</option>
          <option value="quote">Quote</option>
          <option value="song">Song</option>
          <option value="entry">Entry</option>
          <option value="note">Note</option>

        </select>


          <ul id="ul">
            {data.length === 0 ? (
              <p>No data available.</p>
            ) : (
              // Use a for loop to iterate through the data
              (() => {
                const items = [];
                for (let i = 0; i < data.length; i++) {
                  const note = data[i];
                  items.push(
                      /* Render the content of each MongoDB document */
                      selectedTag==="" || selectedTag === note.tag ? (
                      <li id='li' key={note._id}>
                      <div>

                    <button className = "deleteBtn" onClick={() => deleteNote(note._id)}>X</button>

                    <p className = "heading">{note.book}</p>
                    <p className = "content">{note.content}</p>
                  {/*  <p>Tag: {note.tag}</p> */}
                  </div>
                  </li>
        ):(null)
                  /* Add more properties as needed */

                  );
                }
                return items;
              })()
            )}
          </ul>

        </div>
        <Footer />
        </div>
      );
}

export default Collection;
