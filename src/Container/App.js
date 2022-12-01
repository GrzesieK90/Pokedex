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
      searchfield:""
    }
  }
  
  async componentDidMount(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    const pokemon = await response.json()
    this.setState({ pokemons:pokemon.results })
  }

  onSearchChange = (e) =>{
    this.setState({searchfield: e.target.value})
  }

  render() {
    const {pokemons, searchfield} = this.state
    const filteredPokemons = pokemons.filter(pokemon =>{
      return pokemon.name.toLowerCase().includes(searchfield.toLowerCase())
    })
  return (
    <div className="all">
      <img src={Pokemon} alt="Pokemon Logo" style={{width: 300, height: 100}}/>
        <ErrorBoundry>
            <Scroll>
              <div className="pokeList">
                <PokeList pokemons={filteredPokemons} />
              </div>
            </Scroll>
            <SearchBox searchChange={this.onSearchChange} />
        </ErrorBoundry>
      <img src={Gotta} alt="gotta" style={{width: 400, height: 70}}/>
    </div>
  )
}
}

export default App;
