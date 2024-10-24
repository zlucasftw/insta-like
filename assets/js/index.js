// Importando a URL do arquivo config.js
import { API_URL } from './api.js'; 

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
modal.style.display = "none";

const imageGrid = document.querySelector(".image-grid");

// Função para buscar e exibir os dados do endpoint
async function fetchAndDisplayImages() {
    try {
        const response = await fetch(API_URL);  // Usando a URL importada
        const data = await response.json();

        // Inserindo as imagens e descrições no grid
        data.forEach(item => {
            const article = document.createElement("article");
            article.dataset.description = item.descricao;

            const img = document.createElement("img");
            img.src = item.imgUrl;
            img.alt = item.alt;

            article.appendChild(img);
            imageGrid.appendChild(article);
        });

        // Adicionando eventos de clique para cada imagem carregada
        addImageClickEvents();
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Função para adicionar os eventos de clique às imagens
function addImageClickEvents() {
    const images = document.querySelectorAll(".image-grid img");
    images.forEach(img => {
        img.addEventListener("click", function () {
            captionText.textContent = "";
            modal.style.display = "block";
            modalImg.src = this.src;

            const article = this.closest("article");
            const description = article ? article.dataset.description : '';
            const caption = description || this.alt;

            captionText.innerHTML = `<p>${caption}</p>`;
        });
    });
}

// Evento de fechar o modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Fechar o modal clicando fora dele
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Chamar a função para buscar e exibir as imagens ao carregar a página
fetchAndDisplayImages();
