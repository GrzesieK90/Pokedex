import React from "react";
import "./PokeCard.css"



const PokeCard = ({ name, url, type }) => {
    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
    const PokeId = url.split('/')[url.split('/').length - 2]
    return(
    <div className="card">
        <img alt="" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokeId}.png`}/>
        <div>
            <div className="id">
                <h1>#{PokeId}</h1>
            </div>
            <h1>{capitalizeFirst(name)}</h1>
            <h1>{type}</h1>
        </div>
    </div>
    )
}

export default PokeCard