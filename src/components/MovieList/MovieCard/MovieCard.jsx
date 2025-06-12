import React from "react";
import './moviecard.css'
import { getMovieDetails } from "../../../utils";
import { useState } from "react";

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'

export default function MovieCard({movie, handleCardClick}){

  function handleFavClick(event){
    event.stopPropagation();
    setIsFav(!isFav);
    if(movie.liked === null)
      movie.liked = true;
    else
      movie.liked = !movie.liked;
  
  }

  function handleWatchedClick(event){
    event.stopPropagation();
    setIsWatched(!isWatched);

    if(movie.watched === null)
      movie.watched = true;
    else
      movie.watched = !movie.watched;
    
  }


  const {title, vote_average, poster_path} = movie; //destructuring movie prop (object) and storing info we need in variables
  const fullImagePath = baseURL + posterSize + poster_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)
  const [isFav, setIsFav] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  return(
  
    <article  onClick = {() => {getMovieDetails(movie).then((movieDetails) => {handleCardClick(movieDetails)})}} className = "movie-card">
      <img className = "movie-image" src={fullImagePath} alt={`${title} movie poster`}/>
        <h2>{title}</h2>
        <p>⭐️ {vote_average}</p>
        <div className = "button-container">
          <p onClick = {handleFavClick} className = "like-btn"> {isFav ?'❤️':'🖤'}</p>
          <p onClick = {handleWatchedClick} className ="watched-btn"> {isWatched ?'☑️':'⬛️'} </p>
        </div>
    </article>

  )

}