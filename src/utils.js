
const baseNowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US'; //url that we are sending fetch request to that returns array with movies now playing and details without page at end
const baseSearchUrl = 'https://api.themoviedb.org/3/search/movie'; //url that is the request that returns movie results depending on a query parameter which we are getting from our SearchBar component
const baseDetailsUrl = 'https://api.themoviedb.org/3/movie/';

//function makes fetch request to movie API depending on what page we need to load. If we are loading more pages past 1 we append what fetch request retrusn to our existing array
  export async function getMovieList(pageIdx){
    
    const urlWithPage = `${baseNowPlayingUrl}&page=${pageIdx}` //update url depending on the pageIdx that gets passed in which is being updated depending on userClick
  

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
      const searchResults = moviesFound.results; //gives us the actual movieFound array
      
      return searchResults;

    } catch(err){

      console.error("No search results");
      console.error(err);
    }

  }

  export async function getMovieDetails(movie){

    const urlWithMovieID = baseDetailsUrl + movie.id + '?language=en-US';

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