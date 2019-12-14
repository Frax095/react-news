import './App.css';
import React from 'react';
import logo from './assets/images/react-news.svg';
import {useState, useEffect, useMemo, useRef} from 'react';
import axios from 'axios';
import News from './news/news';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loading from './components/loading';
import useLocalStorage from 'react-use-localstorage';

const categories = {
  'general': 'Tutte',
  'sports': 'Sport',
  'business': 'Business',
  'entertainment': 'Intrattenimento',
  'health': 'Salute',
  'science': 'Scienza',
  'technology': 'Tecnologia'
};

const languages = {
  'gb' : 'english',
  'it' : 'italiano'
};

function Main() {
  const [q, setQ] = useState("");
  const [getCategory, saveCategory] = useLocalStorage('category', 'general');
  const [category, setCategory] = useState(getCategory);
  const [delay, setDelay] = useState(0);
  const [news, setNews] = useState(0);
  const [lang, setLang] = useLocalStorage('lang', 'gb');

  //con questo delay evitiamo che si accavallino più chiamate api
  //non venendo più chiamate ad ogni lettera digitata, ma da quando viene ditata
  //la prima lettera parte un timer di (in questo caso) 400ms
  //alla fine quindi dei 400ms partirà la chiamata api

  useEffect(() => {
    if(q != "") {
      clearTimeout(delay);
      setDelay(setTimeout(function() {
        setNews(0);
        axios.get('https://newsapi.org/v2/top-headlines?country='+ lang + '&q='+ q +'&apiKey=e1d47c98f9534b86a41382194c6845b5').then(res => {
          setNews(res.data.articles);
        });
      }, 400));
    }
  }, [q]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setNews(0);
      axios.get('https://newsapi.org/v2/top-headlines?country='+ lang + '&category='+ category +'&apiKey=e1d47c98f9534b86a41382194c6845b5').then(res => {
        setNews(res.data.articles);
        saveCategory(category);
      });
  }, [category]);

  function refreshPage(value) {
    setLang(value);
    setTimeout(function() {
      window.location.reload();
    }, 400)
  }

  return (
    <>
    <select onChange={(item) => refreshPage(item.target.value)} className="language-selector">
      { Object.keys(languages).map(language => (
          <option selected={lang === language ? 'selected' : ''} value={language}>{languages[language]}</option>
      ))}
    </select>
    <div className="centred">
      <div className="filters">
        <input
          className="searchBar"
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Fai una ricerca..."
        />
        {Object.keys(categories).map(key => (
          <div onClick={() => setCategory(key)} className={`btn ${key === category ? 'active' : ''}`} key={key} to={`/${key}`}>{categories[key]}</div>
        ))}
      </div>
    </div>

    {news === 0 ? 
      <Loading /> : ""
    }

    {news.length > 0 ?
      <div className="masonry-container">
          <News news={news}></News>
      </div>
     : ""}

    {news.length === 0 ? 
    <h1>"La ricerca <span className="q">{q}</span> non ha prodotto risultati"</h1>
    : ""}
    
    </>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
      </header>
      <Main />
    </div>
  );
}

export default App;
