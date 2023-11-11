import React from 'react'
import './FAQ.css'; // Import your CSS file
import Navbar  from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer'
const FaqPage = () => {
  const faqItems = [
    {
      question: 'What is QuoteVault?',
      answer: 'QuoteVault is a platform for discovering, collecting, and sharing your favorite quotes. It provides a diverse collection of inspirational and thought-provoking quotes from various sources, including books, authors, and famous personalities.',
    },
    {
      question: 'How can I use QuoteVault?',
      answer: 'Using QuoteVault is easy! Simply sign up for an account, and you can start exploring quotes right away. You can search for specific quotes, save your favorites to your profile, and even share them on social media.',
    },
    {
      question: 'Is QuoteVault free to use?',
      answer: 'Yes, QuoteVault offers a free basic plan that allows you to access a wide range of quotes and basic features. However, we also offer a premium subscription plan that provides additional benefits, such as ad-free browsing and exclusive content.',
    },
    {
      question: 'Can I contribute my own quotes?',
      answer: 'Absolutely! QuoteVault encourages users to share their favorite quotes. You can submit quotes to our community collection, and if approved, they will be shared with other users on the platform.',
    },
    {
      question: 'How can I contact support?',
      answer: 'If you have any questions, issues, or feedback, please visit our Contact Us page. Our support team is ready to assist you with any inquiries or concerns you may have.',
    },
  ];

  return (
    <div>
      <Navbar/>

    <div className="faq-page">
      <header className="header">
        <h1>Frequently Asked Questions</h1>
      </header>
      <main className="content">
        <ul className="faq-list">
          {faqItems.map((item, index) => (
            <li key={index} className="faq-item">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
    <Footer/>
    </div>
  );
};

export default FaqPage;
