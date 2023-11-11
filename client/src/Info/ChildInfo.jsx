import React from 'react';
import './ChildInfo.css'; // Import your CSS file

const ChildComponent = ({ imageSrc, text, imagePosition }) => {
  return (
    <div className={`child-component ${imagePosition}`}>
    <div className="image">
      <img src={imageSrc} alt="Section Image" />
    </div>
    <div className="text">
      <p>{text}</p>
    </div>
  </div>
);
};

export default ChildComponent;
