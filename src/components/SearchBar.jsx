import React from "react";
import { useState } from "react";


export default function SearchBar(){

  return(

    <div>
      <input type="text"  placeholder="Search..."/>
      <button>Submit</button>
      <button>Clear</button>
    </div>

  )

}