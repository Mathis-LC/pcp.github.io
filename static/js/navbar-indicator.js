document.addEventListener("DOMContentLoaded", () => {
    // Nom du fichier de la page actuelle
    let currentPage = window.location.pathname.split("/").pop();

    // Si l'URL se termine par /, on considère index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    // Parcourt tous les liens de la navbar, y compris les sous-menus
    document.querySelectorAll(".navbar-start .navbar-item[href]").forEach(link => {
        const linkUrl = new URL(link.href, window.location.href);
        const linkPage = linkUrl.pathname.split("/").pop();

        if (linkPage === currentPage) {
            // Colore le lien correspondant à la page actuelle
            link.classList.remove("has-text-white");
            link.classList.add("has-text-success");

            // Si le lien appartient à un sous-menu, colore aussi son titre parent
            const parentDropdown = link.closest(".has-dropdown");

            if (parentDropdown) {
                const parentTitle = parentDropdown.querySelector(".navbar-link");

                if (parentTitle) {
                    parentTitle.classList.remove("has-text-white");
                    parentTitle.classList.add("has-text-success");
                }
            }
        }
    });
});