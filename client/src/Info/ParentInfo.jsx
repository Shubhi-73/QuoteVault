import React from 'react';
import './ParentInfo.css'; // Import your CSS file
import ChildInfo from './ChildInfo.jsx';

const ParentInfo = () => {
  const sections = [
    {
      id: 1,
      imageSrc: 'https://readwise-assets.s3.amazonaws.com/static/images/landing/remember-what.8f22dbd70c26.png', // Replace with actual image URLs
      text: "Remember what you read How often do you finish a book, only to forget the key ideas two weeks later? We don't remember things by just reading them once. QuoteVault fixes this using a scientific process called Spaced Repetition. We surface your best highlights back to you at the right times, and let you review them every day with the daily email and app." ,
      imagePosition: 'left',
    },
    {
      id: 2,
      imageSrc: 'https://readwise-assets.s3.amazonaws.com/static/images/landing/landing_hero.12a1e031294d.png',
      text :"Revisit your highlights Highlighting is great, but what's the point if you're never going to see any of those highlights again? QuoteVault lets you quickly liberate your highlights (all into one place), and ensures that you'll actually see and use them.",
      imagePosition: 'right',
    },
    {
      id: 3,
      imageSrc: 'https://readwise-assets.s3.amazonaws.com/static/images/landing/tag-note-organize.ed0690506c64.png',
      text: "Tag, note, search, and organize With your highlights all in one place, QuoteVault gives you the power to organize and connect these ideas in new ways. Use search to find a highlight instantly, tag it to cement its spot in your library, and then add your own annotation to it.",
      imagePosition: 'left',
    },
    // Add more sections as needed
  ];

  return (
    <div className="parent-component">
    {sections.map((section) => (
      <ChildInfo
        key={section.id}
        imageSrc={section.imageSrc}
        text={section.text}
        imagePosition={section.imagePosition}
      />
    ))}
  </div>
);
};

export default ParentInfo;
