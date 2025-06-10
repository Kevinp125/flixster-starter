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


  //function just updates the state of the pageNum everytime user clicks load more button.
  function handleLoadMoreClick(){
    setPageNum((pageNum) => pageNum + 1);
  }

  //function makes fetch request to movie API depending on what page we need to load. If we are loading more pages past 1 we append what fetch request retrusn to our existing array
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
      const newMovies = movieList.results; //gives us the actual movie array

      setMovieList( (prevList) => [...prevList, ...newMovies]); //spread operator ... allows us to join contents of two different arrays together. I.E a = [1,2,3] b = [4,5] c = [...a,...b] c = [1,2,3,4,5]

      console.log(movieList);
    
      
    } catch (err) {
      
      console.log("Error fetching the movies");
      console.log(err);

    }
  }

  useEffect(() => { //useEffect is observing the pageNum state. When it changes it means the user clicked the load more button so we need to call getMovieList again with the updated page num.
    getMovieList(pageNum);
  }, [pageNum])


  return (
    <div className="App">
      
      <Header />

      <section className = "movie-list-container"> {/*Creating a section that holds all the movieCard articles*/} 
        <MovieList movieList = {movieList}/>
      </section>

      <button className = "load-more-btn" onClick = {handleLoadMoreClick}>Load More...</button>

      <Footer />
  
    </div>
  )
}

export default App
