// Ce JavaScript permet de gérer l'ouverture et la fermeture des images en grand lorsqu'elles sont cliquées.

const images = document.querySelectorAll(".image-clickable");
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");

if (modal && modalImage) {

    const closeButton = modal.querySelector(".modal-close");
    const background = modal.querySelector(".modal-background");

    function openModal(image) {
        if (window.innerWidth <= 1023) {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modal.classList.add("is-active");
        }
    }

    function closeModal() {
        modal.classList.remove("is-active");
    }

    images.forEach(image => {
        image.addEventListener("click", () => {
            openModal(image);
        });
    });

    closeButton.addEventListener("click", closeModal);
    background.addEventListener("click", closeModal);
}