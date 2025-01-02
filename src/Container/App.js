import React, { Component } from "react";
import PokeList from "../Components/PokeList/PokeList";
import SearchBox from "../Components/SearchBox/SearchBox";
import ErrorBoundry from '../Components/ErrorBoundry/ErrorBoundry';
import Scroll from '../Components/Scroll/Scroll'
import Pokemon from '../Components/PNG/pokemon.png'
import Gotta from '../Components/PNG/gotta.png'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state ={
      pokemons: [],
      searchfield:"",
      pokemonDetails: []
    }
  }
  
  async componentDidMount(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    const pokemon = await response.json()
    
    // Fetch details for all Pokemon to enable number search
    const details = await Promise.all(
      pokemon.results.map(async (p, index) => {
        const detailResponse = await fetch(p.url);
        return await detailResponse.json();
      })
    );

    this.setState({ 
      pokemons: pokemon.results,
      pokemonDetails: details 
    })
  }

  onSearchChange = (e) =>{
    this.setState({searchfield: e.target.value})
  }

  render() {
    const {pokemons, searchfield, pokemonDetails} = this.state
    
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
              <Scroll>
                <PokeList 
                  pokemons={filteredPokemons} 
                  pokemonDetails={pokemonDetails}
                />
              </Scroll>
              <SearchBox 
                searchChange={this.onSearchChange} 
                placeholder="Search Pokemon by Name or Number"
              />
          </ErrorBoundry>
        <img src={Gotta} alt="gotta" style={{width: 400, height: 70}}/>
      </div>
    )
  }
}

export default App;