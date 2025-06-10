import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import './stylesheets/movielist.css'

import MovieList from './components/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'

const  baseUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US'; //url that we are sending fetch request to without page at end

const App = () => {

  const [movieList, setMovieList] = useState([]); //decalre a movieList as an empty array. We will populate it with a fetch request to imdb API
  const [pageNum, setPageNum] = useState(1); //pageNum will keep track of the movies we are rendering. Whenever we click the load more button the page increases and we request next page of movies

  function handleLoadMoreClick(){
    setPageNum((pageNum) => pageNum + 1);
  }

  async function getMovieList(pageIdx){
    
    const urlWithPage = `${baseUrl}&page=${pageIdx}` //update url depending on the pageIdx that gets passed in which is being updated depending on userClick
    

    try{
      const res = await fetch(urlWithPage, {
        headers:{
          accept: 'application/json',
          Authorization: `bearer ${import.meta.env.VITE_API_KEY}`,
    
        },
      });
      if(!res.ok){
        throw new Error('Bad api request');
      }
      const movieList = await res.json();
      console.log(movieList);
    } catch (err) {
      
      console.log("Error fetching the movies");
      console.log(err);
    }
  }

  useEffect(() => {
    getMovieList(pageNum);
  }, [pageNum])


  return (
    <div className="App">
      
      <Header />

      <section className = "movie-list-container"> {/*Creating a section that holds all the movieCard articles*/} 
        <MovieList />
      </section>

      <button onClick = {handleLoadMoreClick}>Load More... Count: {pageNum}</button>

      <Footer />
  
    </div>
  )
}

export default App
