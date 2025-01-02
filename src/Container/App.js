import React, { Component } from "react";
import PokeList from "../Components/PokeList/PokeList";
import SearchBox from "../Components/SearchBox/SearchBox";
import ErrorBoundry from '../Components/ErrorBoundry/ErrorBoundry';
import Scroll from '../Components/Scroll/Scroll'
import Pokemon from '../Components/PNG/pokemon.png'
import Gotta from '../Components/PNG/gotta.png'
import './App.css';

const BATCH_SIZE = 151;
const TOTAL_POKEMON = 807;

class App extends Component {
  constructor(){
    super()
    this.state = {
      pokemons: [],
      searchfield: "",
      pokemonDetails: [],
      isLoading: false,
      loadedBatches: 0,
      hasMoreToLoad: true
    }
    
    // Bind methods
    this.loadMorePokemon = this.loadMorePokemon.bind(this);
  }
  
  async componentDidMount(){
    // Initial load of first batch
    await this.loadMorePokemon();
  }

  async loadMorePokemon() {
    const { loadedBatches, pokemonDetails } = this.state;
    
    // Prevent loading if we've reached the total
    if (this.state.pokemonDetails.length >= TOTAL_POKEMON) {
      this.setState({ hasMoreToLoad: false });
      return;
    }

    this.setState({ isLoading: true });

    try {
      // Calculate offset based on loaded batches
      const offset = loadedBatches * BATCH_SIZE;
      
      // Fetch next batch of Pokemon names
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${BATCH_SIZE}&offset=${offset}`
      );
      const pokemon = await response.json();

      // Fetch details for this batch
      const newDetails = await Promise.all(
        pokemon.results.map(async (p) => {
          const detailResponse = await fetch(p.url);
          return await detailResponse.json();
        })
      );

      // Combine with existing details
      this.setState(prevState => ({
        pokemons: [...prevState.pokemons, ...pokemon.results],
        pokemonDetails: [...prevState.pokemonDetails, ...newDetails],
        loadedBatches: prevState.loadedBatches + 1,
        isLoading: false
      }));
    } catch (error) {
      console.error("Error loading Pokemon:", error);
      this.setState({ 
        isLoading: false,
        hasMoreToLoad: false 
      });
    }
  }

  onSearchChange = (e) => {
    this.setState({searchfield: e.target.value})
  }

  render() {
    const {pokemons, searchfield, pokemonDetails, isLoading, hasMoreToLoad} = this.state;
    
    const filteredPokemons = pokemons.filter(pokemon => {
      const searchTerm = searchfield.toLowerCase();
      
      // Find corresponding Pokemon details
      const pokemonDetail = pokemonDetails.find(
        detail => detail.name === pokemon.name
      );

      // Search by name
      const nameMatch = pokemon.name.toLowerCase().includes(searchTerm);
      
      // Search by number
      const numberMatch = pokemonDetail && 
        pokemonDetail.id.toString().includes(searchTerm);

      return nameMatch || numberMatch;
    })

    return (
      <div className="all">
        <img src={Pokemon} alt="Pokemon Logo" style={{width: 300, height: 100}}/>
          <ErrorBoundry>
              <SearchBox 
                searchChange={this.onSearchChange} 
                placeholder="Search Pokemon by Name or Number"
              />
              <Scroll onReachBottom={
                hasMoreToLoad && !isLoading ? this.loadMorePokemon : null
              }>
                <PokeList 
                  pokemons={filteredPokemons} 
                  pokemonDetails={pokemonDetails}
                />
                {isLoading && (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading more Pokemon...</p>
                  </div>
                )}
              </Scroll>
          </ErrorBoundry>
        <img src={Gotta} alt="gotta" style={{width: 400, height: 70}}/>
      </div>
    )
  }
}

export default App;