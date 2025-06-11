import React from "react";
import { useState } from "react";


export default function SearchBar({handleSearch}){

  const [searchInput, setSearchInput] = useState(''); //initialzing state for our input

  //function updates input field everytime user types something
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  }
  
  //when user hits enter key or clicks the submit button this function will fire which executes the search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchInput);
    }
  }

  //handle the submitBtnClick by calling the same handle Search function and passing it same input
  const handleSubmitClick = () => {
    handleSearch(searchInput);
  }

  return(

    <div>
      <input type="text" value = {searchInput} onChange = {handleInputChange} onKeyDown = {handleKeyDown} placeholder="Search..."/>
      <button onClick = {handleSubmitClick}>Submit</button>
      <button>Clear</button>
    </div>

  )

}