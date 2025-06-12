import React from "react";
import './modalstyles.css'

const baseURL = 'https://image.tmdb.org/t/p'; // 
const posterSize = '/w500'

export default function MovieModal({movieDetails, handleCardClose}){

  const fullImagePath = baseURL + posterSize + movieDetails.poster_path; //this makes the image path cause data doesnt have full image path just the poster_path (imdb thing)

  return(
  
    <div id = "modal" className="modal-overlay">
        <div className="modal-content">

          <div className = "close-container">
            <span onClick = {handleCardClose} className="close">&times;</span>
          </div>
          
          <h2>{movieDetails.title}</h2>
          <img className = "modal-img" src={fullImagePath} alt={`${movieDetails.title} movie poster`} />
          <p>Release Date: {movieDetails.release_date}</p>

        </div>
    </div>



  )

}