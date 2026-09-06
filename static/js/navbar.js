// Ce JavaScript permet de gérer l'ouverture et la fermeture du menu de navigation sur téléphone.

const burgers = document.querySelectorAll('.navbar-burger');

burgers.forEach(burger => {
    burger.addEventListener('click', () => {

        const menu = document.querySelector('.navbar-menu');

        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');

        burger.setAttribute(
            'aria-expanded',
            burger.classList.contains('is-active')
        );
    });
});


// Ce JavaScript permet de gérer l'ouverture et la fermeture des sous-menus de la navbar sur téléphone.

const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (event) => {

        if (window.innerWidth <= 1023) {
            event.preventDefault();

            const dropdown = toggle.parentElement;

            dropdown.classList.toggle('is-active');
        }
    });
});