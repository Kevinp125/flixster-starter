import React from "react";
import './header.css'
import SearchBar from "../SearchBar/SearchBar";
import SortDropdown from "../SortDropdown/SortDropdown";

export default function Header({handleSearch, handleClear, handleSort}){

  return(
    <header className="web-header-container">
      <h1>🎥 Flixster 🍿</h1>

      <aside className = "search-sort-aside">
        <SearchBar handleSearch = {handleSearch} handleClear={handleClear}/>
        <SortDropdown handleSort = {handleSort}/>
      </aside>
    </header>
  )



}