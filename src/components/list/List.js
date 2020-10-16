import React from "react"
import "./list.css"


export const List=(props)=>{
    
    return (
        <>
         <div className="pok-grid">
             {props.pokemons.map(pokemon=>(
                 <div className="pok" key={pokemon.id}>
                     <img src={`http://www.serebii.net/pokemongo/pokemon/${pokemon.num}.png`} alt={pokemon.name}/>
                     <h5>{pokemon.name}</h5>
                     <h5>{pokemon.num}</h5>
                     <h3>Pokemon Type</h3>
             {pokemon.type.map((val,index)=><h5 key={index}>{val}</h5>)}
             <h3>Pokemon Weaknesses</h3>
                     {pokemon.weaknesses.map((val,index)=><h5 key={index}>{val}</h5>)}
                    
                 </div>
             ))}
         </div>
        </>
    )

}