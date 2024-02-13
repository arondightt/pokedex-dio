document.addEventListener('click', function(event) {
    const pokemonItem = event.target.closest('.pokemon');
    if (pokemonItem) {
        const modal = document.getElementById('pokemonModal');
        const modalContent = modal.querySelector('.modal-content');
        const { number, name, types, photo } = pokemonItem.dataset;

        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>${name}</h2>
            <p>Number: #${number}</p>
            <p>Type(s): ${types}</p>
            <img src="${photo}" alt="${name}">
        `;

        modal.style.display = 'block';
    }
});

document.addEventListener('click', function(event) {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function(button) {
        if (event.target === button) {
            const modal = document.getElementById('pokemonModal');
            modal.style.display = 'none';
        }
    });
});
