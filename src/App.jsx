import { useState } from 'react'
import './App.css'
import './stylesheets/movielist.css'
import MovieList from './components/MovieList'


const App = () => {
  return (
    <div className="App">

      <section className = "movie-list-container"> {/*Creating a section that holds all the movieCard articles*/} 
        <MovieList />
      </section>
  
    </div>
  )
}

export default App
