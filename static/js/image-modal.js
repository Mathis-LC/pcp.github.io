// Ce JavaScript permet de gérer l'ouverture et la fermeture des images en grand lorsqu'elles sont cliquées.

const images = document.querySelectorAll(".image-clickable");
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");

if (modal && modalImage) {

    images.forEach(image => {
        image.addEventListener("click", () => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;

            modal.classList.add("is-active");
        });
    });

    const closeButton = modal.querySelector(".modal-close");

    closeButton.addEventListener("click", () => {
        modal.classList.remove("is-active");
    });

    const background = modal.querySelector(".modal-background");

    background.addEventListener("click", () => {
        modal.classList.remove("is-active");
    });
}