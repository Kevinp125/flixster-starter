import React from "react";
import './modalstyles.css'
import { getMovieVideos, buildGenreString } from "../../utils";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import { useState } from "react";
import { useEffect } from "react";

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'


export default function MovieModal({movieDetails, handleCardClose}){

  const [embedId, setEmbedId] = useState('');
  const fullImagePath = baseURL + posterSize + movieDetails.backdrop_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)

  useEffect( () => {
    getMovieVideos(movieDetails).then((movieTrailerKey) => {setEmbedId(movieTrailerKey)});
  },[]);

  return(
  
    <div id = "modal" className="modal-overlay">
        <div className="modal-content">

          <div className = "close-container">
            <span onClick = {handleCardClose} className="close">&times;</span>
          </div>
          
          <h2>{movieDetails.title}</h2>
          <img className = "modal-img" src={fullImagePath} alt={`${movieDetails.title} movie poster`} />
          <p>Release Date: {movieDetails.release_date}</p>
          <p>Overview: {movieDetails.overview}</p>
          <p>Genres: {buildGenreString(movieDetails)}</p>
          <p>Runtime: {movieDetails.runtime} minutes</p>
          <YoutubeEmbed embedId = {embedId}/>         

        </div>
    </div>

  )

}