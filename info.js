// Obtén la ID del Pokémon de la URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');


// Función para obtener los detalles del Pokémon por su ID
async function getPokemonDetailsById(pokemonId) {
    try {
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
    }
}

async function cargarDetallePokemon() {
  try {
    console.log(pokemonId);
      // Obtener los datos del Pokémon específico usando su ID
      const pokemonData = await getPokemonDetailsById(pokemonId);

      // Mostrar los detalles del Pokémon en la página
      const pokemonDetailContainer = document.getElementById('pokemon-detail-container');

      const imageElement = document.createElement('img');
      imageElement.src = pokemonData.sprites.other['official-artwork'].front_default;
      pokemonDetailContainer.appendChild(imageElement);

      const nameElement = document.createElement('p');
      nameElement.textContent = pokemonData.name;
      pokemonDetailContainer.appendChild(nameElement);
      console.log(nameElement);

      const typesElement = document.createElement('p');
      typesElement.textContent = 'Tipos: ' + pokemonData.types.map(type => type.type.name).join(', ');
      pokemonDetailContainer.appendChild(typesElement);
      
      // Agregar más detalles según sea necesario...

  } catch (error) {
      console.error('Error al cargar los detalles del Pokémon:', error);
  }
}


// Llama a la función para mostrar los detalles del Pokémon
cargarDetallePokemon();