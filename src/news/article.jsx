import React from 'react';
import '../../src/App.css';

const article = (props) => {
    
    return (
        <div className='article-card'>
            <a className="article-link" href={props.url} target="_blank">
                <img alt='some value' className="article-img" src={props.urlToImage}/>
                <h3 className="article-title">{props.title}</h3>
                <p className="article-text">{props.description}</p>
            </a>
        </div>
    )   
}

export default article;