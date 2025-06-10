import React from "react";
import { useState } from "react";


export default function SortDropdown(){

  return(
    <select id ="sort-dropdown">
      <option >Sort By</option>
      <option >Title (A-Z)</option>
      <option >Release Date (Recent to Oldest)</option>
      <option >Vote Average (Highest to Lowest)</option>
    </select>
  )
}