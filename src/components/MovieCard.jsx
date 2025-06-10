import React from "react";
import '../stylesheets/moviecard.css'

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'

export default function MovieCard({movie}){

  const {title, vote_average, poster_path} = movie; //destructuring movie prop (object) and storing info we need in variables
  const fullImagePath = baseURL + posterSize + poster_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)

  return(
    <>
      <article className = "movie-card">
        <img className = "movie-image" src={fullImagePath} alt="Stock movie photo"/>
  
          <h2>{title}</h2>
          <p>{vote_average}</p>



      </article>
    </>
  )

}