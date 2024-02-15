function darkMode() {
    var element = document.body;
    var content = document.getElementById("DarkModetext");
    element.className = "dark-mode";
  }
  function lightMode() {
    var element = document.body;
    var content = document.getElementById("DarkModetext");
    element.className = "light-mode";
  }


async function getPokemonData(id) {
    const obj= await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(obj);
    return obj;
}

async function cargarData(){
    const pokemonGrid = document.getElementById('pokemon-grid');

      for (let i = 1; i <= 151; i++) {
        const pokemonData = await getPokemonData(i);

        // Crear elemento para el Pokémon
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";

        const imageElement = document.createElement("img");
        imageElement.src = pokemonData.sprites.other['official-artwork'].front_default;
        imageElement.alt = pokemonData.name; 
        console.log(pokemonData.types[0].type.name)

        const nameElement = document.createElement("h3");
        nameElement.textContent = pokemonData.name;
        function primeraMayusc(nameElement) {
            return nameElement.charArt(0).toUpperCase()+nameElement.slice(1);
        }

        const elemento1Element = document.createElement("p");
        elemento1Element.textContent = pokemonData.types[0].type.name;
        
        var idElement = document.createElement("p");
        idElement.textContent = (pokemonData.id).toString().padStart(3,'0');
        

        gridItem.appendChild(imageElement);
        gridItem.appendChild(idElement);
        gridItem.appendChild(nameElement);
        gridItem.appendChild(elemento1Element);
        if (pokemonData.types.length>1) {
            const elemento2Element = document.createElement("p");
            elemento2Element.textContent = pokemonData.types[1].type.name;
            gridItem.appendChild(elemento2Element);
        }

        // Agregar el elemento al contenedor de grid
        pokemonGrid.appendChild(gridItem);
      }
}

// Supongamos que tienes una función para obtener los datos de la API
async function obtenerDatosPokemon() {
    try {
      const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const datos = await respuesta.json();
      const pokemons = datos.results; // Array de objetos con nombres y URLs
      // Itera sobre los pokemons y crea elementos HTML
      pokemons.forEach(async (pokemon) => {
        const respuestaDetalle = await fetch(pokemon.url);
        const detalle = await respuestaDetalle.json();
        const tipo = detalle.types[0].type.name; // Tipo del Pokémon
        const elementoPokemon = document.createElement('li');
        elementoPokemon.textContent = pokemon.name;
        elementoPokemon.classList.add(`tipo-${tipo}`);

      });
    } catch (error) {
      console.error('Error al obtener datos de la PokéAPI:', error);
    }
  }
  
  obtenerDatosPokemon();
  

async function getEvolutionChain(id){
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

cargarData();

// script.js
const searchInput = document.getElementById('searchInput');
const pokemonList = document.getElementById('pokemonList');

// Obtener datos de la API de Pokémon (puedes usar fetch o axios)
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // Limitamos a los primeros 151 Pokémon
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const pokemons = data.results;

        // Escuchar cambios en el input de búsqueda
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();

            // Filtrar la lista de Pokémon según el texto introducido
            const filteredPokemons = pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchText)
            );

            // Mostrar solo los primeros 5 Pokémon
            const slicedPokemons = filteredPokemons.slice(0, 5);
            displayPokemons(slicedPokemons);
        });

        // Mostrar la lista inicial
        displayPokemons([]);
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));

function displayPokemons(pokemons) {
    pokemonList.innerHTML = '';

    if (pokemons.length === 0) {
        pokemonList.innerHTML = '<p>No se encontraron coincidencias.</p>';
    } else {
        pokemons.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            pokemonList.appendChild(listItem);
        });
    }
}

