
const baseDetailsUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US'; //url that we are sending fetch request to that returns array with movies now playing and details without page at end
const baseSearchUrl = 'https://api.themoviedb.org/3/search/movie'; //url that is the request that returns movie results depending on a query parameter which we are getting from our SearchBar component

//function makes fetch request to movie API depending on what page we need to load. If we are loading more pages past 1 we append what fetch request retrusn to our existing array
  export async function getMovieList(pageIdx){
    
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

      return newMovies;
      setMovieList( (prevList) => [...prevList, ...newMovies]); //spread operator ... allows us to join contents of two different arrays together. I.E a = [1,2,3] b = [4,5] c = [...a,...b] c = [1,2,3,4,5]
          
    } catch (err) {
      
      console.log("Error fetching the movies");
      console.log(err);

    }
  }


  //function actually calls api and that returns an array of movies that match the searchTerm
  export async function getSearchResults(searchTerm, pageIdx){

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
      const searchResults = moviesFound.results; //gives us the actual movieFound array

      setMovieList( (prevSearchResults) => [...prevSearchResults, ...searchResults]); //by setting MovieList to be the concatentation of the prev list and the new results we keep tacking to search results if usre clicks load more.

    } catch(err){

      console.log("No search results");
      console.log(err);
    }

  }