import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeList.css"

const PokeList = ({pokemons}) => {
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            setIsLoading(true);
            try {
                const details = await Promise.all(
                    pokemons.map(async (pokemon) => {
                        const response = await fetch(pokemon.url);
                        return await response.json();
                    })
                );
                setPokemonDetails(details);
            } catch (error) {
                console.error("Error fetching Pokemon details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [pokemons]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>waiting to load data...</p>
            </div>
        );
    }

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