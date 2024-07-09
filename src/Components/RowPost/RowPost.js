import './RowPost.css';
import Youtube from 'react-youtube';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import axios from '../../axios';
import React, { useState, useEffect } from 'react';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlid , setUrlID] = useState('');
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        axios.get(props.url)
            .then((response) => {
                console.log(response.data);
                setMovies(response.data.results);
            })
            .catch(err => {
                alert('networkerr');
            });
    }, []);

    const opts = {
        height :'390',
        width :'650',
        playerVars: {
            autoplay: 1
        }
    };

    const handleMovie = (id) => {
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                if(response.data.results.length !== 0) {
                    setUrlID(response.data.results[0]);
                } else {
                    console.log('Its empty');
                }
            });
    };

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj) => (
                    <div
                        key={obj.id}
                        className='poster-wrapper'
                        onMouseEnter={() => setHoveredId(obj.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <img
                            className={props.isSmall ? 'smallPoster' : 'poster'}
                            alt='poster'
                            src={`${imageUrl+obj.backdrop_path}`}
                            onClick={() => handleMovie(obj.id)}
                        />
                        {hoveredId === obj.id && urlid && (
                            <div className="youtube-overlay">
                                <Youtube opts={opts} videoId={urlid.key} />
                                {/* Additional code from the second snippet */}
                                <div className='pop-up'>
                                    {urlid ? <Youtube className='pop-img' videoId={urlid.key} opts={opts} /> : <img className='pop-img' src={`${imageUrl + obj.backdrop_path}`} alt="" />}
                                    <div className='p-3'>
                                        <div className='description d-flex justify-content-between'>
                                            <div>
                                                <button><i class="fa-sharp fa-solid fa-play" style={{ color: "#000000;" }}></i></button>
                                                <button className='icons-black'><i class="fa-sharp fa-light fa-plus" style={{ color: "#000000;" }}></i></button>
                                                <button className='icons-black'><i class="fa fa-thin fa-thumbs-up" style={{ color: "#000000;" }}></i></button>
                                            </div>
                                            <div>
                                                <button className='icons-black'><i class="fa-sharp fa-solid fa-angle-down" style={{ color: "#000000;" }}></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End of additional code */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RowPost;
