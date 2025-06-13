import React from "react";
import './moviecard.css'
import { getMovieDetails } from "../../../utils";
import { useState } from "react";

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'

export default function MovieCard({movie, handleCardClick, setMovieToLikedInMovieList, setMovieToWatchedInMovieList}){

  //when like is clicked call the setMovieToLiked which updates the like boolean field in the parent
  function handleFavClick(event){
    event.stopPropagation();
    setMovieToLikedInMovieList(movie);
  }

  //when watch is clicked call the setMovieToWatched which updates the watched boolean field in the parent
  function handleWatchedClick(event){
    event.stopPropagation();
    setMovieToWatchedInMovieList(movie);
  }


  const {title, vote_average, poster_path} = movie; //destructuring movie prop (object) and storing info we need in variables
  const fullImagePath = baseURL + posterSize + poster_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)


  return(
  
    <article  onClick = {() => {getMovieDetails(movie).then((movieDetails) => {handleCardClick(movieDetails)})}} className = "movie-card">
      <img className = "movie-image" src={fullImagePath} alt={`${title} movie poster`}/>
        <h2>{title}</h2>
        <p>⭐️ {vote_average}</p>
        <div className = "button-container">
          <p onClick = {handleFavClick} className = "like-btn"> {movie.liked ?'❤️':'🖤'}</p>
          <p onClick = {handleWatchedClick} className ="watched-btn"> {movie.watched ?'☑️':'⬛️'} </p>
        </div>
    </article>

  )

}