import React from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeList.css"

const PokeList = ({pokemons, pokemonDetails = []}) => {
    return (
    <div className="pokeList">
        {pokemons.map((pokemon, i) => {
            const details = pokemonDetails.find(detail => detail.name === pokemon.name);
            return(
                <PokeCard 
                    key={i}
                    name={pokemon.name}
                    url={pokemon.url}
                    details={details}
                />
            )
        })}
    </div>
    )
}

export default PokeList