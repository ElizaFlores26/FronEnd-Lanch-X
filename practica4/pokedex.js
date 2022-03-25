const tipo = document.querySelector('[data-poke-types]');
const habi = document.querySelector('[data-poke-habi]');
const estad = document.querySelector('[data-poke-estad]');
const movimi = document.querySelector('[data-poke-move]');


const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("img/pokemonNo.png")
            pokeInfo("pokemon no encontrado :( ","")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);

            let pokeImg = data.sprites.front_default;
            let id = data.id;
            let peso = data.weight;
            let altura = data.height;
            altura = altura / 10;

            pokeImage(pokeImg);
            pokeInfo(pokeName, id);
            pokePesoAltura(peso, altura);

            console.log(pokeImg);
            console.log(peso);
            console.log(altura);
            console.log(id);

            const {stats, types, abilities,moves} = data;
            pokeTipos(types);
            pokeHabi(abilities);
            pokeStats(stats);
            pokeMove(moves);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeInfo = (pokeName, id) => {
    const nombre = document.getElementById("name");
    nombre.innerHTML = pokeName;
    const pokeid = document.getElementById("id");
    pokeid.innerHTML = id;
}

const pokePesoAltura = (peso, altura) => {
    const PesoPokemon = document.getElementById("peso");
    PesoPokemon.innerHTML = peso;

    const AlturaPokemon = document.getElementById("altura");
    AlturaPokemon.innerHTML = altura;
}

const pokeTipos = (types) => {     
    tipo.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("p");
        typeTextElement.textContent = type.type.name;
        typeTextElement.className = 'estilo'; 
        tipo.appendChild(typeTextElement);
    });
    console.log(tipo);
}

const pokeHabi = (abilities) => {  
    habi.innerHTML='';
     abilities.forEach(ability => {
        const typeTextElement = document.createElement("p");
        typeTextElement.textContent = ability.ability.name;
        typeTextElement.className = 'estilo';  
        habi.appendChild(typeTextElement);
    });
    console.log(habi);
}

const pokeStats = (stats) => {
    estad.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        estad.appendChild(statElement);
    });
    console.log(estad);
}


const pokeMove = (moves) => {
    movimi.innerHTML = '';
    moves.forEach(move => {
        const statElementName = document.createElement("div");
        statElementName.textContent = move.move.name;
        movimi.appendChild(statElementName);
    });
    console.log(movimi);
}