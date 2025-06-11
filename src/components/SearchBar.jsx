import React from "react";
import { useState } from "react";


export default function SearchBar({handleSearch}){

  const [searchInput, setSearchInput] = useState(''); //initialzing state for our input

  //function updates input field everytime user types something
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  }
  
  //when user hits enter key or clicks the submit button this function will fire which executes the search
  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      console.log(searchInput);
      handleSearch(searchInput);
    }
    else{
      console.log(searchInput);
    }
  }

  return(

    <div>
      <input type="text" value = {searchInput} onChange = {handleInputChange} onKeyDown = {handleSubmit} placeholder="Search..."/>
      <button onClick = {handleSubmit}>Submit</button>
      <button>Clear</button>
    </div>

  )

}