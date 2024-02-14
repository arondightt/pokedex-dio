document.addEventListener('click', function (event) {
    const pokemonItem = event.target.closest('.pokemon');
    if (pokemonItem) {
        const modal = document.getElementById('pokemonModal');
        const modalContent = modal.querySelector('.modal-content');
        const { number, name, types, photo } = pokemonItem.dataset;

        const typesArray = types.split(',');
        const typesList = typesArray.map(type => `<li class='type ${type.trim()}'>${type.trim()}</li>`).join('');

        modalContent.innerHTML = `
           <span class="close">&times;</span>
           <content class='modalInfo'>
                <div class='top'>            
                    <h2 class='name'>${name}</h2>
                    <p class='number'>#${number}</p>
                </div>

               <div class='detail'>
               <ol class='types'>${typesList}</ul>
                <img src="${photo}" alt="${name}">
               </div>

           </content>
       `;
        modalContent.classList.add(typesArray[0]);
        modal.style.display = 'block';

        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', function() {
            modalContent.classList.remove(typesArray[0]);
            modal.style.display = 'none';
        });
    }
});
