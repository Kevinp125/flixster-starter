import React from "react";
import MovieCard from "./MovieCard/MovieCard";

export default function MovieList({movieList, handleCardClick, movieView, setMovieToLikedInMovieList, setMovieToWatchedInMovieList}){

  //we need to do this before we render the movielist. So based on the movieView (page user wants to see) we grab the movies with the field true for that view.
  const filteredArray = movieList.filter( (movieData) => {
    if(movieView === 'liked') return movieData.liked;
    else if(movieView === 'watched') return movieData.watched;
    else return true;
  })

  return(

    <>  
      {/*Map through the filtered array and for each movie data create a movie card and pass the data as prop*/}
      {filteredArray.map((movieData) => <MovieCard handleCardClick = {handleCardClick} key = {movieData.id } movie = {movieData} setMovieToLikedInMovieList = {setMovieToLikedInMovieList} setMovieToWatchedInMovieList = {setMovieToWatchedInMovieList}/> )}
    </>

  )

}