document.addEventListener('DOMContentLoaded', () => {
    window.onload = () => {
        document.getElementById('search-btn')
            .addEventListener('click', searchPokemonImg);
    }
});
    
function searchPokemonImg() {
    let imageContainer = document.getElementById('pokemon-image-container');
    let loadingAnimation = document.getElementById('loading-animation');
    let pokemonNameSearched = document.getElementById('pokemon-name').value;
    pokemonNameSearched = pokemonNameSearched.toLowerCase();

    // Ocultar la imagen y mostrar el GIF de carga
    removeAllImgChildren(imageContainer);
    loadingAnimation.style.display = 'block';

    //Request
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameSearched}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Enter a valid Pokemon ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.name) {
                //Append the image response
                const image = document.createElement('img');
                image.src = data.sprites.front_default;
                imageContainer.appendChild(image);
                //Stop showing the loading animation
                loadingAnimation.style.display = 'none';
                image.style.display = 'block';
            } else {
                throw new Error('Enter a valid Pokemon');
            }
        })
        .catch(error => {
            //Display error message and remove loading animation
            console.error('Error:', error);
            imageContainer.innerHTML = `<p id="error-message" style="color: red;">${error.message}</p>`;
            loadingAnimation.style.display = 'none';
            //Delete the error message after 4 seconds
            let errorMessage = document.getElementById('error-message');
            elementTimer(errorMessage, 4000);
        });
}

//Eliminates the element after the especific time that you set
function elementTimer(element, time) {
    let timeRemaining = time;
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, timeRemaining);
}

function removeAllImgChildren(imageContainer) {
    // Obtener la lista de elementos hijos del contenedor
    const children = Array.from(imageContainer.children);
    // Iterar sobre los elementos hijos y eliminarlos
    children.forEach(child => {
        if (child.tagName.toLowerCase() === 'img') {
            child.parentNode.removeChild(child);
        }
    });
}


