const IMAGES = [
    'Image/futbol.jpg',
    'Image/tenis.jpg',
    'Image/kriket.jpg',
    'Image/bascketbol.jpg'
];

const prevBut = document.getElementById('prev-button');
const nextBut = document.getElementById('next-button');
const modal = document.getElementById('modal');
const galleryImage = document.getElementById('gallery-image');
const closeButton = document.querySelector('.close-button');
const modalText = document.getElementById('modal-text');

let currImg = 0;

// Функция для обновления изображения
function updateImage() {
    galleryImage.src = IMAGES[currImg];
}

// Переключение на предыдущее изображение
prevBut.addEventListener('click', () => {
    currImg = (currImg - 1 + IMAGES.length) % IMAGES.length;
    updateImage();
});

// Переключение на следующее изображение
nextBut.addEventListener('click', () => {
    currImg = (currImg + 1) % IMAGES.length;
    updateImage();
});

// Открытие модального окна при клике на изображение
galleryImage.addEventListener('click', () => {
    modalText.textContent = `Вы просматриваете изображение ${currImg + 1} из ${IMAGES.length}`;
    modal.style.display = 'block';
});

// Закрытие модального окна при клике на крестик
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

