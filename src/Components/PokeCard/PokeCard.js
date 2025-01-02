import React, { useState } from "react";
import "./PokeCard.css"

const TYPE_COLORS = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#fd2d2d',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

const PokeCard = ({ name, url, details }) => {
    const [isDetailView, setIsDetailView] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

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

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    const handleImageError = () => {
        setIsImageLoading(false);
    };

    const getModalBackground = (types) => {
        if (!types || types.length === 0) return '#333';
        
        const typeColors = types.map(t => TYPE_COLORS[t.type.name.toLowerCase()] || '#333');
        
        if (typeColors.length === 1) {
            return typeColors[0];
        } else if (typeColors.length === 2) {
            return `linear-gradient(135deg, ${typeColors[0]} 0%, ${typeColors[1]} 100%)`;
        } else if (typeColors.length === 3) {
            return `linear-gradient(45deg, ${typeColors[0]} 0%, ${typeColors[1]} 50%, ${typeColors[2]} 100%)`;
        }
        
        return '#333';
    };

    if (isDetailView && details) {
        const modalBackground = getModalBackground(details.types);
        
        return (
            <div className="pokemon-modal" onClick={toggleDetailView}>
                <div 
                    className="pokemon-modal-content" 
                    onClick={(e) => e.stopPropagation()}
                    style={{ background: modalBackground }}
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

    return (
        <div className="pokemon-card" onClick={toggleDetailView}>
            {isImageLoading && (
                <div className="image-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading image...</p>
                </div>
            )}
            {details && (
                <img 
                    src={bestIcon} 
                    alt={`${name} sprite`} 
                    className={`pokemon-image ${isImageLoading ? 'hidden' : ''}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
            <p>{capitalizeFirst(name)}</p>
        </div>
    );
}

export default PokeCard