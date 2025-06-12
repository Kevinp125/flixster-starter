import { useState } from 'react'
import './App.css'
import './stylesheets/movielist.css'

import MovieList from './components/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className="App">
      
      <Header />

      <section className = "movie-list-container"> {/*Creating a section that holds all the movieCard articles*/} 
        <MovieList />
      </section>

      <Footer />
  
    </div>
  )
}

export default App
