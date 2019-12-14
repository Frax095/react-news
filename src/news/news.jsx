import React from 'react';
import Article from './article';
const myImage = "https://www.fabercom.it/wp-content/uploads/2015/11/news-Faber-Com-srl-novit%C3%A0.jpg";
const news = (props) => props.news.map((el, index) => {
    return (
        <Article
            key={index}
            urlToImage={ !el.urlToImage || el.urlToImage.charAt(0) === "/" ? myImage : el.urlToImage }
            title={el.title}
            description={el.description}
            name={el.source.name}
            url={el.url}
        >
        </Article>
    )
})
export default news;