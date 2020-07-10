import React from "react";

import './Article.css';

//- Formatting time string

function timeFormat(date) {

    const d = new Date(date);
    return d.toLocaleString('en-US',
        {
            month: 'short',
            hour12: true,
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
}

//---

export default function Article({ article, handleCloseModal }) {
    return (
        <div className='article-container'>
            <div className='article-image-container'>
                <img
                    src={article.urlToImage}
                    alt=""/>
            </div>
            <div className='article-texts'>
                <h1>{article.title}</h1>
                <h2>Author: {article.author}</h2>
                <p className='article-description'>{article.description}</p>
                <div>
                    <span>Published at: {timeFormat(article.publishedAt)} (Local time)</span>
                    <a href={article.url} rel="noopener noreferrer" target='_blank'><span>Go to source page</span></a>
                </div>
                <button className='btn' onClick={handleCloseModal}>Close</button>
            </div>
        </div>
    )
}