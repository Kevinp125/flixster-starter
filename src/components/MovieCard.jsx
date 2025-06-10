import React from "react";

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w200'

export default function MovieCard({movie}){

  const {title, vote_average, poster_path} = movie; //destructuring props and storing info we need in variables
  const fullImagePath = baseURL + posterSize + poster_path;

  return(
    <>
      <article className = "movie-card">
        <img src={fullImagePath} alt="Stock movie photo"/>
        <h2>{title}</h2>
        <p>{vote_average}</p>

      </article>
    </>
  )

}