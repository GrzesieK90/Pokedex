import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeList.css"

const PokeList = ({pokemons}) => {
    const [pokemonDetails, setPokemonDetails] = useState([]);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const details = await Promise.all(
                pokemons.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return await response.json();
                })
            );
            setPokemonDetails(details);
        };

        fetchPokemonDetails();
    }, [pokemons]);

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