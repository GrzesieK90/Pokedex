import React, { useState } from "react";
import "./PokeCard.css"

const PokeCard = ({ name, url, details }) => {
    const [isDetailView, setIsDetailView] = useState(false);

    const capitalizeFirst = str => 
        str.charAt(0).toUpperCase() + str.slice(1);

    const PokeId = url.split('/')[url.split('/').length - 2];

    const selectBestIcon = (sprites) => 
        sprites?.other?.['official-artwork']?.front_default || 
        sprites?.front_default || 
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokeId}.png`;

    const bestIcon = details ? selectBestIcon(details.sprites) : null;

    const toggleDetailView = () => 
        setIsDetailView(!isDetailView);

    if (isDetailView && details) {
        return (
            <div className="pokemon-modal" onClick={toggleDetailView}>
                <div 
                    className="pokemon-modal-content" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={toggleDetailView}>×</button>
                    <img 
                        src={bestIcon} 
                        alt={`${name} view`} 
                        className="detail-image"
                    />
                    <div className="detail-info">
                        <h1>#{PokeId} {capitalizeFirst(name)}</h1>
                        <div className="stats">
                            <p>Type: {details.types.map(t => capitalizeFirst(t.type.name)).join(", ")}</p>
                            <p>Height: {details.height / 10} m</p>
                            <p>Weight: {details.weight / 10} kg</p>
                            <h3>Base Stats:</h3>
                            {details.stats.map(stat => (
                                <p key={stat.stat.name}>
                                    {capitalizeFirst(stat.stat.name)}: {stat.base_stat}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
    <div className="card" onClick={toggleDetailView}>
        <img 
            alt="" 
            src={bestIcon}
        />
        <div>
            <div className="id">
                <h1>#{PokeId}</h1>
            </div>
            <h1>{capitalizeFirst(name)}</h1>
        </div>
    </div>
    )
}

export default PokeCard