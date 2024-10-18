// modal.js
// Seleciona elementos
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
modal.style.display = "none";

// Adiciona evento para abrir o modal ao clicar na imagem
const images = document.querySelectorAll(".image-grid img");
images.forEach(img => {
    img.addEventListener("click", function () {
        captionText.textContent = "";
        modal.style.display = "block";
        modalImg.src = this.src;

        // Acesse o elemento pai <article> e obtenha o data-description
        const article = this.closest("article");
        const description = article ? article.dataset.description : '';

        // Verifica se a descrição está vazia e usa o alt da imagem se necessário
        const caption = description || this.alt;
        captionText.innerHTML = `<p>${caption}</p>`; // Adiciona a descrição ou alt
    });
});

// Fecha o modal ao clicar no 'X'
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Fecha o modal ao clicar fora da imagem
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
