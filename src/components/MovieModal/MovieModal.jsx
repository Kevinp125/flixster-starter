import React from "react";
import './modalstyles.css'
import { getMovieVideos } from "../../utils";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import { useState } from "react";
import { useEffect } from "react";

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'


export default function MovieModal({movieDetails, handleCardClose}){

  const [embedId, setEmbedId] = useState('');
  const fullImagePath = baseURL + posterSize + movieDetails.poster_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)

  useEffect( () => {
    getMovieVideos(movieDetails).then((movieTrailerKey) => {setEmbedId(movieTrailerKey)});
  },[]);

  //helper function that returns the list of genres. Will be called in a p tag below
  function buildGenreString(){

    //iterate through genres array of objects and returns just the genre name for each and puts it in new array which we can after use the join method to join all genre names in array nicely separated by commas and space
    const genreString = movieDetails.genres.map( (genre) => genre.name ).join(", ");

    return genreString; //return the genreString
  }

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
          <p>Genres: {buildGenreString()}</p>
          <p>Runtime: {movieDetails.runtime} minutes</p>
          <YoutubeEmbed embedId = {embedId}/>


          

        </div>
    </div>



  )

}