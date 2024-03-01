// Funciones para poner modo oscuro o modo claro y que se guarde de forma local
function modoOscuro() {
    let element = document.body;
    let elementGrid = document.getElementById("pokemon-grid");
    element.className = "dark-mode";
    elementGrid.className = "pokemon-grid-noche";
    localStorage.setItem("modo", "oscuro");
  }
  function modoClaro() {
    let element = document.body;
    let elementGrid = document.getElementById("pokemon-grid");
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

  // Función para obtener datos de la pokeapi
async function getPokemonData(id) {
    const obj= await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return obj;
}

// Función para cargar los datos de cada Pokemon
async function cargarData(){
    const pokemonGrid = document.getElementById('pokemon-grid');
    // For para recorrer los 151 pokemon
        for (let i = 1; i <= 151; i++) {
        const pokemonData = await getPokemonData(i);

        // Crear elemento para el Pokémon
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
         // Agregar un atributo data-id con el ID del Pokémon
        gridItem.setAttribute("data-id", pokemonData.id);

         // Agregar controlador de eventos de clic para redireccionar a la página del Pokémon
        gridItem.addEventListener("click", function() {
            window.location.href = `info.html?id=${pokemonData.id}`;
        });


        const imageElement = document.createElement("img");
        imageElement.src = pokemonData.sprites.other['official-artwork'].front_default;

        const nameElement = document.createElement("p");
        nameElement.textContent = pokemonData.name;

        const elemento1Element = document.createElement("p");
        elemento1Element.textContent = traductorTipo(pokemonData.types[0].type.name);
        elemento1Element.classList.add(`tipo-${pokemonData.types[0].type.name}`);
        
        const idElement = document.createElement("p");
        idElement.textContent = (pokemonData.id).toString().padStart(3,'0');
        

        gridItem.appendChild(imageElement);
        gridItem.appendChild(idElement);
        gridItem.appendChild(nameElement);
        gridItem.appendChild(elemento1Element);
        if (pokemonData.types.length>1) {
            const elemento2Element = document.createElement("p");
            elemento2Element.textContent = traductorTipo(pokemonData.types[1].type.name);
            elemento2Element.classList.add(`tipo-${pokemonData.types[1].type.name}`);
            gridItem.appendChild(elemento2Element);
        }

        // Agregar el elemento al contenedor de grid
        pokemonGrid.appendChild(gridItem);
      }
}
  
async function getData(url){
    const response = await fetch(url);
    const json= await response.text();
    return JSON.parse(json);
} 

cargarData();
// Función que traduce los tipo de los Pokemon obtenidos desde la API
function traductorTipo(elemento1Element) {
switch (elemento1Element) {
    case "grass":
        return "planta"
        break;
    case "bug":
        return "bicho"
        break;
    case "dragon":
        return "dragón"
        break;
    case "electric":
        return "eléctrico"
        break;
    case "fighting":
        return "lucha"
        break;
    case "fire":
        return "fuego"
        break;
    case "flying":
        return "volador"
        break;
    case "ghost":
        return "fantasma"
        break;
    case "ground":
        return "tierra"
        break;
    case "ice":
        return "hielo"
        break;
    case "poison":
        return "veneno"
        break;
    case "psychic":
        return "psíquico"
        break;
    case "rock":
        return "roca"
        break;
    case "steel":
        return "acero"
        break;
    case "water":
        return "agua"
        break;
    case "fairy":
        return "hada"
        break;
    case "normal":
        return "normal"
        break;
    default:
    break;
    }
}

// Función que muestra la lista de Pokémon filtrada por la busqueda
async function ListaFiltrada(filtro) {
    const pokemonGrid = document.getElementById('pokemon-grid');
    pokemonGrid.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
        const pokemonData = await getPokemonData(i);

        if (pokemonData.name.toLowerCase().includes(filtro.toLowerCase())) {
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";
            gridItem.setAttribute("data-id", pokemonData.id);

            gridItem.addEventListener("click", function() {
                window.location.href = `info.html?id=${pokemonData.id}`;
            });

            const imageElement = document.createElement("img");
            imageElement.src = pokemonData.sprites.other['official-artwork'].front_default;

            const nameElement = document.createElement("p");
            nameElement.textContent = pokemonData.name;

            const elemento1Element = document.createElement("p");
            elemento1Element.textContent = traductorTipo(pokemonData.types[0].type.name);
            elemento1Element.classList.add(`tipo-${pokemonData.types[0].type.name}`);

            const idElement = document.createElement("p");
            idElement.textContent = pokemonData.id.toString().padStart(3, '0');

            gridItem.appendChild(imageElement);
            gridItem.appendChild(idElement);
            gridItem.appendChild(nameElement);
            gridItem.appendChild(elemento1Element);

            if (pokemonData.types.length > 1) {
                const elemento2Element = document.createElement("p");
                elemento2Element.textContent = traductorTipo(pokemonData.types[1].type.name);
                elemento2Element.classList.add(`tipo-${pokemonData.types[1].type.name}`);
                gridItem.appendChild(elemento2Element);
            }

            pokemonGrid.appendChild(gridItem);
        } 
    }
}

// Búsqueda de pokemon con cadena de texto
const busqueda = document.getElementById('busqueda');
busqueda.addEventListener('input', () => {
    const texto = busqueda.value;
    ListaFiltrada(texto);
});


ListaFiltrada();


