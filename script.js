window.onload = function() {
    // Função para obter parâmetros da URL por nome
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Obtém o nome da evolução da querystring
    const evolutionName = getParameterByName('evolucao');

    // Atualiza o título da página com o nome da evolução
    document.title = "Página do Pokémon " + evolutionName.charAt(0).toUpperCase() + evolutionName.slice(1);

    // Faz uma requisição à PokeAPI para obter os dados do Pokémon
    fetch("https://pokeapi.co/api/v2/pokemon/" + evolutionName)
        .then(response => response.json())
        .then(data => {
            const pokemonName = data.name;
            const pokemonImageURL = data.sprites.front_default;

            // Cria e adiciona a imagem do Pokémon no corpo da página
            const img = document.createElement('img');
            img.src = pokemonImageURL;
            img.alt = "Imagem do Pokémon " + pokemonName;

            // Adiciona estilos à imagem
            img.style.maxWidth = "100%";
            img.style.height = "auto";

            // Adiciona a imagem dentro de um elemento div com a classe pokemon-image-container
            const pokemonImageContainer = document.createElement('div');
            pokemonImageContainer.classList.add('pokemon-image-container');
            pokemonImageContainer.appendChild(img);

            // Adiciona o contêiner da imagem dentro do elemento main
            document.querySelector('main').appendChild(pokemonImageContainer);
        })
        .catch(error => console.error('Erro ao obter dados do Pokémon:', error));
};