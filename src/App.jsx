import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import './stylesheets/movielist.css'

import MovieList from './components/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'

const baseDetailsUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US'; //url that we are sending fetch request to that returns array with movies now playing and details without page at end
const baseSearchUrl = 'https://api.themoviedb.org/3/search/movie'; //url that is the request that returns movie results depending on a query parameter which we are getting from our SearchBar component

const App = () => {

  const [movieList, setMovieList] = useState([]); //decalre a movieList as an empty array. We will populate it with a fetch request to imdb API
  const [pageNum, setPageNum] = useState(1); //pageNum will keep track of the movies we are rendering. Whenever we click the load more button the page increases and we request next page of movies
  const [isSearching, setIsSearching] = useState(false) //flag to know whether or not we are searching to call correct function in useEffect
  const [searchTerm, setSearchTerm] = useState(''); //need this so that searching pagination also works


  //function just updates the state of the pageNum everytime user clicks load more button.
  function handleLoadMoreClick(){
    setPageNum((pageNum) => pageNum + 1);
  }

  //function makes fetch request to movie API depending on what page we need to load. If we are loading more pages past 1 we append what fetch request retrusn to our existing array
  async function getMovieList(pageIdx){
    
    const urlWithPage = `${baseDetailsUrl}&page=${pageIdx}` //update url depending on the pageIdx that gets passed in which is being updated depending on userClick
    

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
    if (isSearching && searchTerm) {
      getSearchResults(searchTerm, pageNum);
    } else {
      getMovieList(pageNum);
    }
  }, [pageNum, searchTerm])


  //function just fires off when user submits a search. It turns our flag on, emptys MovieList (causing re-render), and setsPageNum to once again triggering our useEffect. In useEffect since search flag is on itll call the getSearchResults function instead of the getallmovies  
  function handleSearch(searchInput){
    
    setIsSearching(true);
    setMovieList([]);
    setSearchTerm(searchInput); //set search term state so that when user wants to load more search results the query persists across renders
    setPageNum(1); //lastly set the Pagenum to 1 to trigger the useEffect ***when pageNum in now playing is > 1*** If user never paginated this wont trigger a use effect. What will trigger it is the change of the searchTerm
  }

  //function actually calls api and that returns an array of movies that match the searchTerm
  async function getSearchResults(searchTerm, pageIdx){

    console.log("in get search results");
    const urlWithQuery = `${baseSearchUrl}?query=${searchTerm}&include_adult=false&language=en-US&page=${pageIdx}`;

    try{

      const res = await fetch(urlWithQuery, {
        headers:{
          accept: 'application/json',
          Authorization: `bearer ${import.meta.env.VITE_API_KEY}`,
    
        },
      });
      if(!res.ok){
        throw new Error('Bad api request');
      }
      
      const moviesFound = await res.json();
      const searchResults = moviesFound.results; //gives us the actual movie array

      setMovieList( (prevSearchResults) => [...prevSearchResults, ...searchResults]); //by setting MovieList to be the concatentation of the prev list and the new results we keep tacking to search results if usre clicks load more.

    } catch(err){

      console.log("No search results");
      console.log(err);
    }

  }


  return (
    <div className="App">
      
      <Header handleSearch = {handleSearch}/>

      <section className = "movie-list-container"> {/*Creating a section that holds all the movieCard articles*/} 
        <MovieList movieList = {movieList}/>
      </section>

      <button className = "load-more-btn" onClick = {handleLoadMoreClick}>Load More...</button>

      <Footer />
  
    </div>
  )
}

export default App
