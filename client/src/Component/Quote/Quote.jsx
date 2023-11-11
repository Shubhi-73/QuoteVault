import React from 'react';
import './Quote.css';

function Quote() {
    const quoteOfTheDay = "The only way to do great work is to love what you do. – Steve Jobs";

    return (
        <div className="quote-page">
            <h2>Quote of the Day</h2>
            <div className="quote">
                <p>{quoteOfTheDay}</p>
            </div>
        </div>
    );
}

export default Quote;
