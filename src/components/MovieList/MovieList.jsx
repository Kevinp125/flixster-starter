import React from "react";
import MovieCard from "./MovieCard/MovieCard";

export default function MovieList({movieList, handleCardClick}){

  return(

    <>  
      {/*Map through the data array and for each movie data create a movie card and pass the data as prop*/}
      {movieList.map((movieData) => <MovieCard handleCardClick = {handleCardClick} key = {movieData.id } movie = {movieData}/> )}
    </>

  )

}