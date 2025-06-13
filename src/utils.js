
const BASE_MOVIE_URL = 'https://api.themoviedb.org/3/'

const BASE_NOW_PLAYING_URL = `${BASE_MOVIE_URL}movie/now_playing?language=en-US`; //url that we are sending fetch request to that returns array with movies now playing and details without page at end
const BASE_SEARCH_URL = `${BASE_MOVIE_URL}search/movie`; //url that is the request that returns movie results depending on a query parameter which we are getting from our SearchBar component
const BASE_DETAILS_URL = `${BASE_MOVIE_URL}movie/`;
const BASE_MOVIE_VIDEOS_URL = `${BASE_MOVIE_URL}movie/`;

//function makes fetch request to movie API depending on what page we need to load. If we are loading more pages past 1 we append what fetch request retrusn to our existing array
  export async function getMovieList(pageIdx){
    
    const urlWithPage = `${BASE_NOW_PLAYING_URL}&page=${pageIdx}` //update url depending on the pageIdx that gets passed in which is being updated depending on userClick
  

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

      return newMovies; //finally return the list of movies the fetchRequest responded with
          
    } catch (err) {
      
      console.error("Error fetching the movies");
      console.error(err);

    }
  }


  //function actually calls api and that returns an array of movies that match the searchTerm
  export async function getSearchResults(searchTerm, pageIdx){

    const urlWithQuery = `${BASE_SEARCH_URL}?query=${searchTerm}&include_adult=false&language=en-US&page=${pageIdx}`;

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
      const searchResults = moviesFound.results; //gives us the actual movieFound array
      
      return searchResults;

    } catch(err){

      console.error("No search results");
      console.error(err);
    }

  }

  export async function getMovieDetails(movie){

    const urlWithMovieID = BASE_DETAILS_URL + movie.id + '?language=en-US';

    try{

      const res = await fetch(urlWithMovieID, {
        headers:{
          accept: 'application/json',
          Authorization: `bearer ${import.meta.env.VITE_API_KEY}`,
        }
      });

      if(!res.ok){
        throw new Error('Bad api request');
      }

      const movieDetailed = await res.json();
      return movieDetailed;

    } catch(err){
      console.error('fetch request that gives us more detailed movie information failed');
      console.error(err);
    }

  }

  //function does a fetch request which returns all the videos pertaining to a certain movie
  export async function getMovieVideos(movie){

    const videosUrlWithMovieID = `${BASE_MOVIE_VIDEOS_URL}${movie.id}/videos?language=en-US`

    try{  

      const res = await fetch(videosUrlWithMovieID, {
        headers:{
          accept: 'application/json',
          Authorization: `bearer ${import.meta.env.VITE_API_KEY}`,          
        }
      });

      if(!res.ok){
        throw new Error('Bad api request');
      }

      let movieVideos = await res.json();
      movieVideos = movieVideos.results;
      let movieTrailer = getMovieTrailer(movieVideos); //pass the resulting array of video objects into getMovieTrailer which finds the video of type "trailer" and returns it
      return movieTrailer.key;

    } catch(err){
      console.error('fetch request that gives us all movie trailers failed');
      console.error(err);
    }

  }

  //function uses find method to return first instance of video who has type Trailer
  export function getMovieTrailer(movieVideoList){

    return movieVideoList.find((video) => video.type === 'Trailer');

  }


  //helper function that returns the list of genres. Will be called in a p tag below
  export function buildGenreString(movieDetails){

    //iterate through genres array of objects and returns just the genre name for each and puts it in new array which we can after use the join method to join all genre names in array nicely separated by commas and space
    const genreString = movieDetails.genres.map( (genre) => genre.name ).join(", ");

    return genreString; //return the genreString
  }