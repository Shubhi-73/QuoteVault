import React from 'react';
import './Footer.css'; // Import your CSS file

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>QuoteVault</h1>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <ul>
            <li><a href="/facebook"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Made by Sejal, Vishakha, Snigdha</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
