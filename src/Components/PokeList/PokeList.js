import React from "react";
import PokeCard from "../PokeCard/PokeCard";
import  "./PokeList.css"



const PokeList = ({pokemons}) => {
    return (
    <div className="pokeList">
        {pokemons.map((_, i) => {
            return(<PokeCard 
                key={i}
                name={pokemons[i].name}
                url={pokemons[i].url}
                type={pokemons[i].type}
            />
        )})}
    </div>
    )
}

export default PokeList