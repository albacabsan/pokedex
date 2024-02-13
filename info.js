async function getPokemonData(id) {
    const obj = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(obj);
    return obj;
  }

  async function loadData() {
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

      const nameElement = document.createElement("p");
      nameElement.textContent = pokemonData.name;

      const elemento1Element = document.createElement("h2");
      elemento1Element.textContent = pokemonData.types[0].type.name;

      gridItem.appendChild(imageElement);
      gridItem.appendChild(nameElement);
      gridItem.appendChild(elemento1Element);

      // Agregar el elemento al contenedor de grid
      pokemonGrid.appendChild(gridItem);
    }
  }

  async function getData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  // Llamar a la función para cargar datos al cargar la página
  loadData();