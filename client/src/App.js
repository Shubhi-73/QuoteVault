import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import LoginSignUp from './Pages/Login';
import ComposePage from './Pages/Compose/Compose';
import CollectionPage from './Pages/Collection/Collection';
import FAQs from './Pages/FAQ/FAQ';

function App() {
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetch("https://backend-quotevault.onrender.com/home")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, []);

  return (
   <div>
     <BrowserRouter>

       <Routes>
         <Route path='/Home' element={<Home />} />
         <Route path='/' element={<LoginSignUp />} />
         <Route path='/Compose' element={<ComposePage />} />
         <Route path='/Collection' element={<CollectionPage />} />
         <Route path='/Faq' element={<FAQs />} />

       </Routes>
     </BrowserRouter>
   </div>
 );
}

export default App
