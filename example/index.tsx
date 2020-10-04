import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContextStateProvider, useContextState } from '../.';
const exampleConfig ={
  first: 'Megaman', last: 'isTheBest'
}
const exampleConfig2 ={
  count: 0
}
const exampleConfig3 ={
  pokemonInfo: 0,
  isLoadingPokemonInfo: true
}
const globalFunctions =(props: any)=>{
  async function getPokemonInfo(){
    let pokemonInfo = {error: true}
    try{
      const data =  await fetch('https://pokeapi.co/api/v2/pokemon/greninja')
      const greninjaInfo= await data.json()
      pokemonInfo = greninjaInfo
    }catch(e){
      console.error('There was an error', e)
    }
    props.updateContextState({pokemonInfo, isLoadingPokemonInfo: false})
  }
return {
  getPokemonInfo
}
}
const App = () => {
  return (
    <div>
      <ContextStateProvider  stateConfig={exampleConfig}>
        <Example />
      </ContextStateProvider>
      <ContextStateProvider  stateConfig={exampleConfig2}>
        <Example2 />
      </ContextStateProvider>
      <ContextStateProvider globalFunctions={globalFunctions} stateConfig={exampleConfig3}>
        <Example3 />
      </ContextStateProvider>
    </div>
  );
};
const Example = () => {
  const {first, last, updateContextState} = useContextState()

  function handleChange(key, e:any){
    updateContextState({[key]: e.target.value})
  }
  return(
    <div>
       <input type="text" id="first" onChange={(e:any)=>handleChange('first',e)} value={first} />
       <input type="text" id="last" onChange={(e:any)=>handleChange('last',e)} value={last} />
    </div>
  )
}
const Example2 = () => {
  const { count } = useContextState()
  return(
    <div>
      {count}
    </div>
  )
}
const Example3 = () => {
  const { pokemonInfo, isLoadingPokemonInfo, getPokemonInfo } = useContextState()
  React.useEffect(()=>{
    getPokemonInfo()
  },[])
  if(isLoadingPokemonInfo){
    return <div>Loading...</div>
  }
  if(pokemonInfo.error){
    return <div>Error loading pokemon info</div>
  }
  return(
    <div style={{display:'flex', alignItems: 'center'}}>
      <img src={pokemonInfo.sprites.front_shiny} />
      <span> {pokemonInfo.order}</span>: {pokemonInfo.name}

    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
