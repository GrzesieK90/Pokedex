import React from "react";
import './SearchBox.css'

const SearchBox = ({searchChange, placeholder = 'Search Pokemons'}) => {
    return(
        <div className="input">
            <input
            type='search' 
            placeholder={placeholder} 
            onChange={searchChange}/>
        </div>
    )
}

export default SearchBox