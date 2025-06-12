import React from "react";
import './modalstyles.css'

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'

export default function MovieModal({movieDetails}){

  const fullImagePath = baseURL + posterSize + movieDetails.poster_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)

  return(
  
    <div id = "modal" className="modal-overlay">
        <div className="modal-content">
          <h2>{movieDetails.title}</h2>
          <img src={fullImagePath} alt={`${movieDetails.title} movie poster`} />
          <p>Release Date: {movieDetails.release_date}</p>
          
        </div>
    </div>



  )

}