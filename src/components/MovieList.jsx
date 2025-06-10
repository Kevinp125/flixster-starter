import React from "react";
import MovieCard from "./MovieCard";
import data from "../data/data.js"

export default function MovieList(){

  return(

    //Map through the data array and for each movie data create a movie card and pass the info as a prop
    data.results.map((movieData, index) => {
      return(
        <MovieCard key = {index} movie = {movieData}/>
      )
    })

  )

}