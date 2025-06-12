import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import './App.css'
import './components/MovieList/movielist.css'
import {getMovieList, getSearchResults} from './utils.js'

import MovieList from './components/MovieList/MovieList.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Header/Footer/Footer.jsx'
import MovieModal from './components/MovieModal/MovieModal.jsx'

const App = () => {

  const [movieList, setMovieList] = useState([]); //decalre a movieList as an empty array. We will populate it with a fetch request to imdb API
  const [searchTerm, setSearchTerm] = useState(''); //need this so that searching pagination also works
  const pageNum = useRef(1);  //useRef here for pageNum is better since pageNum doesn't affect our dom and will get updated immidiately with useRef instead of state.
  const isSearching = useRef(false); //use a ref for the isSearching flag so it persists across renders and updates instantly
  const [movieChosen, setMovieChosen] = useState(null); //state will get updated with a specific movie once a card is clicked


  //function updates the pageNum and calls the funtions that returns the appropriate movie page and appends it to array. If we are in search mode we call get Search results.
  function handleLoadMoreClick(){

    pageNum.current++;

    if(isSearching.current){
      getSearchResults(searchTerm, pageNum.current).then(newResults => setMovieList((prevSearchResults => [...prevSearchResults, ...newResults])));
    }
    else{
      getMovieList(pageNum.current).then(newMovieList => setMovieList(prevMovieList => [...prevMovieList, ...newMovieList])); 
    }
  }

  //function just fires off when user submits a search. It turns our flag on, emptys MovieList (causing re-render), and setsPageNum to one triggering our useEffect. In useEffect since search flag is on itll call the getSearchResults function instead of the getallmovies  
  function handleSearch(searchInput){
    //call getSearchResults here not in the useEffect
    isSearching.current = true;
    setSearchTerm(searchInput);
    getSearchResults(searchInput, pageNum.current).then(newResults => setMovieList(newResults))
  }


  //function will fire when user hits the clear button
  function handleClear(clearInput){
    isSearching.current = false; //just change isSearching flag to false to when useEffect goes off we just re-render page with now playing movies
    pageNum.current = 1; //make sure page is reset for pagination.
    getMovieList(pageNum.current).then(newMovieList => setMovieList(newMovieList));
    setSearchTerm(clearInput); //make search term an empty string to trigger useEffect
  }

  useEffect(() => { //useEffect only fires on pageMount and renders first page of now playing movies.
    getMovieList(pageNum.current).then(newMovieList => setMovieList(newMovieList)); 
  },[]) 

  
  //this function will be passed down to SortDropdown component so that in that component we can determine which sort user clicks and call this function and sent result back up to parent in the form of "sortType". All sorting logic and updating of movieList happens here so we dont have to pass all that down
  function handleSort(sortType){

    if(sortType === 'default'){
      pageNum.current = 1;
      getMovieList(pageNum.current).then(movieList => setMovieList(movieList));
    }

    else if(sortType === 'title'){
      sortByTitle();
    }

    else if(sortType === 'release-date'){
      sortByReleaseDate();
    }

    else{
      sortByAvgRating();
    }

  }

  //sorts movies by title alphabetical order
  function sortByTitle(){

    const sortedByTitle = [...movieList];
    sortedByTitle.sort((a,b) => { //so JS sort for whatever reason doesn't return a new array but rather a reference to the same newly modified array. Thats why in order to trigger re-render in above line we need to copy movieList into new array and sort that one so react notices the array "changed" rather than just sorting movieList in place
      if(a.title > b.title) return 1;
      else if(a.original_title < b.original_title) return -1;
      else return 0;
    })

    setMovieList(sortedByTitle);
  }

  //sorts movies by Release date
  function sortByReleaseDate(){

    const sortedByReleaseDate = [...movieList];
    sortedByReleaseDate.sort((a,b) => {
      if(a.release_date > b.release_date) return -1;
      else if(a.release_date < b.release_date) return 1;
      else return 0;
    })

    setMovieList(sortedByReleaseDate);
  }

  //Sort by the AvgRating
  function sortByAvgRating(){

    const sortedByRating = [...movieList];
    sortedByRating.sort( (a,b) => {
      return b.vote_average - a.vote_average;
    })

    setMovieList(sortedByRating);
    
  }

  //this function will get passed down to the MovieCard component so that onClick it can call it and pass up the right movie data
  function handleCardClick(movieDetails){
    setMovieChosen(movieDetails);
  }

  return (
    <div className="App">
      
      <Header handleSearch = {handleSearch} handleClear={handleClear} handleSort = {handleSort}/>

      <section className = "movie-list-container"> {/*Creating a section that holds all the movieCard articles*/} 
        <MovieList handleCardClick = {handleCardClick} movieList = {movieList}/>
      </section>

      <button className = "load-more-btn" onClick = {handleLoadMoreClick}>Load More...</button>

      <Footer />

      {movieChosen && <MovieModal movieDetails = {movieChosen}/>} {/*If movie chosen is no longer null (has movieDetails) first piece will be true so itll evalute second part of statement which is rendering movieModal */}

    </div>
  )
  
}

export default App
