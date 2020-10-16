import React from 'react';
import "./App.css"

import './App.css';
import { List } from './components/list/List';

class App extends React.Component{
   constructor (){
     super()
     this.state={
       pokemon:[],
       searchField:"",
       selectType:[],
       selectWeak:[],
       types:[],
       weaknesses:[],
     }
   }
 componentDidMount(){
   fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
   .then(respone=>respone.json())
   .then(data=>this.setState({pokemon:data.pokemon}))
 }
  handleChange=(e)=>{
      this.setState({searchField:e.target.value})
  }
  handleType=(event)=>{
    let newVal = event.target.value
    let stateVal = this.state.selectType

    console.log(stateVal)
    console.log(newVal)

    stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
        ? (stateVal = [])
        : stateVal.splice(stateVal.indexOf(newVal), 1)

    this.setState({ selectType: stateVal })
  }
  handleWeak=(event)=>{
    let newVal = event.target.value
    let stateVal = this.state.selectWeak
   

    stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
        ? (stateVal = [])
        : stateVal.splice(stateVal.indexOf(newVal), 1)

    this.setState({ selectWeak: stateVal })
  }
  handleFilter=()=>{
     
     let filteredType = this.state.pokemon.filter((item)=> (item.type.some((val)=>this.state.selectType.includes(val))));

     let filteredWeak = this.state.pokemon.filter((item)=> item.weaknesses.some((val)=>this.state.selectWeak.includes(val)));

     let newSet = [...filteredType,...filteredWeak]
     let set = [... new Set(newSet)]
     
       this.setState({
         pokemon:set
       })


  console.log("filtered",set);

  }
  render(){
    console.log("pok", this.state.pokemon);
    
    const {pokemon, searchField, selectType, selectWeak}=this.state;
    this.types = [...new Set(pokemon.map((val)=>val.type).flat())];
    this.weaknesses = [...new Set(pokemon.map((val)=>val.weaknesses).flat())];
    //console.log(weaknesses)
    //console.log("types",types);
    //console.log("ty",selectType);
    console.log("wk", selectWeak);

   
    const filterPokemons= pokemon.filter(pok=>pok.name.toLowerCase().includes(searchField.toLowerCase()));
   

    return(
      <>
      <div className="App">
      <div className="Search">
      <input type="search" placeholder="Enter" onChange={this.handleChange} />
      <label> Types {"  "}
    <select multiple={true} value={selectType} onChange={this.handleType} > {this.types.map((type,index)=><option key={index} value={type}>{type}</option>)}</select>
      </label>
      <label> weaknesses {"  "}
    <select multiple={true} value={selectWeak} onChange={this.handleWeak} > {this.weaknesses.map((type,index)=><option  key={index} value={type}>{type}</option>)}</select>
      </label>
      <button onClick={this.handleFilter}>Search on filter</button>
      </div>
     
      <div className="pokemon-list">
        <List pokemons={filterPokemons}/>
      </div>
      </div>
      </>
    )
  }
}

export default App;
