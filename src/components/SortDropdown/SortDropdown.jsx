import React from "react";
import { useState } from "react";
import './sortdropdown.css'


export default function SortDropdown({handleSort}){

  //function determines which sort user clicked on and passes up that result to app.jsx which is where actual sorting logic will take place since movieList is there
  function whichSort(event){
    handleSort(event.target.value);
  }

  return(
    <select className = "sort-dropdown" onChange = {whichSort} id ="sort-dropdown">
      <option value = "default" >Sort By</option>
      <option value = "title" >Title (A-Z)</option>
      <option value = "release-date">Release Date (Recent to Oldest)</option>
      <option value = "vote-avg">Vote Average (Highest to Lowest)</option>
    </select>
  )
}