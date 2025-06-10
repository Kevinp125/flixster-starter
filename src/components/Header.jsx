import React from "react";
import '../stylesheets/header-footer.css'
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

export default function Header(){

  return(
    <header className="web-header-container">
      <h1>🎥 Flixster 🍿</h1>

      <aside className = "search-sort-aside">
        <SearchBar />
        <SortDropdown/>
      </aside>
    </header>
  )



}