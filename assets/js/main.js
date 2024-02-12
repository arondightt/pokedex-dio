const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('searchInput');

let maxRecords = 151;
let limit = 10;
let offset = 0;

var generationsList = document.querySelectorAll('.generations ol li');

// Carregar a primeira geração ao carregar a página
window.addEventListener('load', function() {
    loadGeneration(0);
});

generationsList.forEach(function(li, index) {
    li.addEventListener('click', function() {
        loadGeneration(index);
    });
});

function loadGeneration(index) {
    generationsList.forEach(function(li) {
        li.classList.remove('selected');
    });
    generationsList[index].classList.add('selected');

    const generation = getGenerationDetails(index);
    maxRecords = generation.maxRecords;
    limit = generation.limit;
    offset = generation.offset;

    pokemonList.innerHTML = '';
    loadPokemonItems(offset, limit);
}

function getGenerationDetails(index) {
    const generations = [
        { maxRecords: 151, limit: 10, offset: 0 },
        { maxRecords: 251, limit: 10, offset: 151 },
        { maxRecords: 386, limit: 10, offset: 251 },
        { maxRecords: 494, limit: 10, offset: 386 },
        { maxRecords: 649, limit: 10, offset: 494 },
        { maxRecords: 721, limit: 10, offset: 649 },
        { maxRecords: 809, limit: 10, offset: 721 },
        { maxRecords: 898, limit: 10, offset: 809 },
        { maxRecords: 1026, limit: 10, offset: 905 }
    ];

    return generations[index];
}

function searchPokemon() {
    const search = searchInput.value.toLowerCase();
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach((pokemon) => {
        const name = pokemon.querySelector('.name').innerText.toLowerCase();
        if (name.includes(search)) {
            pokemon.style.display = 'flex';
        } else {
            pokemon.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', searchPokemon);

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        if (offset + limit >= maxRecords) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    });
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItems(offset, limit);
});

document.getElementById("scrollToTopButton").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", function() {
    var scrollToTopButton = document.getElementById("scrollToTopButton");
    if (window.pageYOffset > 100) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

