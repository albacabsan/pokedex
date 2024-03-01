// Obtén la ID del Pokémon de la URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

function modoOscuro() {
    let element = document.body;
    let elementGrid = document.getElementById("pokemon-detail-container");
    element.className = "dark-mode";
    elementGrid.className = "pokemon-grid-noche";
    localStorage.setItem("modo", "oscuro");
  }
  function modoClaro() {
    let element = document.body;
    let elementGrid = document.getElementById("pokemon-detail-container");
    element.className = "light-mode";
    elementGrid.className = "pokemon-grid-dia";
    localStorage.setItem("modo", "claro");
  }

  const modo = localStorage.getItem("modo");
  if (modo==="claro") {
    modoClaro();
  } else {
    modoOscuro();
  }

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

async function obtenerCadenaEvolutiva(pokemonId) {
    try {
        const especie = await getData(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const evolutionChainUrl = especie.evolution_chain.url;
        const evolutionChainData = await getData(evolutionChainUrl);

        // Procesar los datos de la cadena evolutiva de la primera generación
        const evolutionStages = [];
        procesarCadenaEvolutivaPrimeraGeneracion(evolutionChainData.chain, evolutionStages);

        // Visualizar las evoluciones
        mostrarEvoluciones(evolutionStages);
    } catch (error) {
        console.error('Error al obtener la cadena evolutiva:', error);
    }
}

function procesarCadenaEvolutivaPrimeraGeneracion(chain, evolutionStages) {
    // Procesar la primera etapa de la cadena evolutiva
    procesarEvolucionPrimeraGeneracion(chain, evolutionStages);

    // Procesar las etapas de evolución restantes, si las hay
    if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(subChain => {
            procesarCadenaEvolutivaPrimeraGeneracion(subChain, evolutionStages);
        });
    }
}

function procesarEvolucionPrimeraGeneracion(chain, evolutionStages) {
    // Verificar si el ID del Pokémon está dentro del rango de la primera generación (1-151)
    if (pokemonId >= 1 && pokemonId <= 151) {
        const evolutionDetails = {
            name: chain.species.name,
            id: pokemonId,
            evolution_method: chain.evolves_to[0]?.evolution_details?.name,
            evolution_requirement: chain.evolves_to[0]?.evolution_details?.trigger?.name,
            // Aquí puedes agregar más detalles sobre la evolución, como el método de evolución
        };
        evolutionStages.push(evolutionDetails);
    }
}




async function mostrarEvoluciones(evolutionStages) {
    const evolutionsContainer = document.getElementById('cadena-evolutiva');

    for (const evolution of evolutionStages) {
        try {
            // Obtener los datos del Pokémon
            const pokemonData = await getData(`https://pokeapi.co/api/v2/pokemon/${evolution.id}/`);

            // Crear elementos HTML para mostrar cada evolución
            const evolutionElement = document.createElement('div');
            evolutionElement.classList.add('evolution');

            const nameElement = document.createElement('p');
            nameElement.textContent = evolution.name;
            evolutionElement.appendChild(nameElement);

            // Agregar el elemento de evolución al contenedor
            evolutionsContainer.appendChild(evolutionElement);
        } catch (error) {
            console.error(`Error al obtener los datos del Pokémon ${evolution.id}:`, error);
        }
    }
}

// Llamar a la función para obtener la cadena evolutiva del pokemon seleccionado
obtenerCadenaEvolutiva(pokemonId);


async function cargarDetallePokemon() {
  try {
      // Obtener los datos del Pokémon específico usando su ID
      const pokemonData = await getPokemonDetailsById(pokemonId);

      // Mostrar los detalles del Pokémon en la página
      const pokemonDetailContainer = document.getElementById('pokemon-detail-container');

      const idElement = document.createElement("p");
      idElement.textContent = (pokemonData.id).toString().padStart(3,'0');
      pokemonDetailContainer.appendChild(idElement);

      const imageElement = document.createElement('img');
      imageElement.src = pokemonData.sprites.other['official-artwork'].front_default;
      pokemonDetailContainer.appendChild(imageElement);

      const nameElement = document.createElement('p');
      nameElement.textContent = pokemonData.name;
      pokemonDetailContainer.appendChild(nameElement);

    const elemento1Element = document.createElement("p");
        elemento1Element.textContent = traductorTipo(pokemonData.types[0].type.name);
        pokemonDetailContainer.appendChild(elemento1Element);

        if (pokemonData.types.length>1) {
            const elemento2Element = document.createElement("p");
            elemento2Element.textContent = traductorTipo(pokemonData.types[1].type.name);
            pokemonDetailContainer.appendChild(elemento2Element);
        }
        const pesoElement = document.createElement('p');
        pesoElement.textContent = traductorPeso(pokemonData.weight);
        pokemonDetailContainer.appendChild(pesoElement);
        
        const alturaElement = document.createElement('p');
        alturaElement.textContent = traductorAltura(pokemonData.height);
        pokemonDetailContainer.appendChild(alturaElement);

  } catch (error) {
      console.error('Error al cargar los detalles del Pokémon:', error);
  }
}


// Llama a la función para mostrar los detalles del Pokémon
cargarDetallePokemon();

// Traductor de tipos a español
function traductorTipo(elemento1Element) {
    switch (elemento1Element) {
        case "grass":
            return "Planta"
            break;
        case "bug":
            return "Bicho"
            break;
        case "dragon":
            return "Dragón"
            break;
        case "electric":
            return "Eléctrico"
            break;
        case "fighting":
            return "Lucha"
            break;
        case "fire":
            return "Fuego"
            break;
        case "flying":
            return "Volador"
            break;
        case "ghost":
            return "Fantasma"
            break;
        case "ground":
            return "Tierra"
            break;
        case "ice":
            return "Hielo"
            break;
        case "poison":
            return "Veneno"
            break;
        case "psychic":
            return "Psíquico"
            break;
        case "rock":
            return "Roca"
            break;
        case "steel":
            return "Acero"
            break;
        case "water":
            return "Agua"
            break;
        case "fairy":
            return "Hada"
            break;
        case "normal":
            return "Normal"
            break;
        default:
        break;
        }
    }
    function traductorPeso(pesoElement) {
        return "Peso: " + pesoElement/10 + " KG"
        }
    function traductorAltura(alturaElement) {
        return "Altura: " + alturaElement/10 + " Metros"
        }
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      }