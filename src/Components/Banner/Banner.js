import React, { useState, useEffect } from 'react';
import './Banner.css';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import axios from '../../axios';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        console.log(response.data.results[randomIndex]);
        setMovie(response.data.results[randomIndex]);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
      });
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})` }}
      className='banner'>
      {movie && (
        <div className='content'>
          <h1 className='title'>{movie.title}</h1>
          <div className='banner_buttons'>
            <button className='button'>Play</button>
            <button className='button'>Mylist</button>
          </div>
          <h1 className='discription'>{movie.overview}</h1>
        </div>
      )}
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
