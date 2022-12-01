import React from "react";
import './SearchBox.css'


const SearchBox = ({_, searchChange}) => {
    return(
        <div className="input">
            <input
            type='search' 
            placeholder='search pokemons' 
            onChange={searchChange}/>
        </div>
    )
}

export default SearchBox