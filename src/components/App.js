import React, { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  console.log(newsData);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=3e24ba4fb45e04e9c011b1e399292150&max=10&lang=en`
      );
      setNewsData(res.data.articles);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e)=>{
    const {value} = e.target;
    setCategory(value)
  }
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div id="main">
      <h1 className="heading">Top 10 {category} news.</h1>
      <select onChange={handleChange} value={category}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : (
        <ol>
          {newsData.map((news,i)=>(
            <li key={i}>
            <img className="news-img" src={news.image} alt={news.title} />
            <section className="new-title-content-author">
              <h3 className="news-title">{news.title}</h3>
              <section className="new-content-author">
                <p className="news-description">{news.description}</p>
                <p className="news-source">
                  <strong>Source:</strong> {news.source.name}
                </p>
              </section>
            </section>
          </li>
          ))}
          
        </ol>
      )}
    </div>
  );
};

export default App;
