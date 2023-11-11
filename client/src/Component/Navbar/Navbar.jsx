import React, { useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom';

const Navbar = () => {
    const[menu,setMenu]=  useState("Home");
  return (
    <body>
          <div className='navbar'>
            <div className='nav-logo'>
                <p>QuoteVault</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setMenu("Home") }}><Link style={{ textDecoration: 'none' }} to='/Home'>Home</Link>{menu === "Home"}</li>
                <li onClick={() => { setMenu("Compose") }}><Link style={{ textDecoration: 'none' }} to='/Compose'>Compose</Link>{menu === "Compose"}</li>
                <li onClick={() => { setMenu("Collection") }}><Link style={{ textDecoration: 'none' }} to='/Collection'>Collection</Link>{menu === "Collection"}</li>
                <li onClick={() => { setMenu("Faq") }}><Link style={{ textDecoration: 'none' }} to='/Faq'>FAQs</Link>{menu === "Faq"}</li>
            </ul>
            <div className='lb'>
                <Link to='/'><button>Logout</button></Link>
            </div>

        </div>
        </body>

  )
}

export default Navbar
