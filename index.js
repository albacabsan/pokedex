async function getPokemonData(id) {
    console.log(123);
    /*const response= await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemosJson= await response.text();
    const obj = JSON.parse(pokemosJson);*/
    const obj= await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(obj);

    /*const respone2= await fetch (`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    console.log(obj.stats);*/

    document.getElementById('name').innerText= obj.name;
    document.getElementById('image').src = obj.sprites.other['official-artwork'].front_default;
    document.getElementById('ability').innerText= obj.abilities[0].ability.name;
}

async function getEvolutionChain(id){
    /*const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemosSpecieJson= await response.text();
    const obj= JSON.parse(pokemosSpecieJson);
    const evolutionChainURL = obj.evolution-chain.url;
    console.log(evolutionChainURL)*/
    const obj= await getData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const evolutionChainURL= obj.evolution_chain.url;
    const evolutionChain= await getData(evolutionChainURL);
    console.log(evolutionChain);
}

async function getData(url){
    const response = await fetch(url);
    const json= await response.text();
    return JSON.parse(json);
}

const poke = [];

for (let i = 1; i <=151; i++) {
    poke[i]=getPokemonData(i);
}

for (let i = 1; i <=151; i++) {
    poke[i];
}

getPokemonData(6);
getEvolutionChain(3);
console.log(23424);
