const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const imageCount = 20;
let currentImage = 0;

const imageWrapper = document.querySelector('.image-wrapper');

for (let i = 0; i < imageCount; i++) {
    const img = document.createElement('img');
    img.src = `images/image${i + 1}.jpeg`; // Updated image path
    img.alt = `Image ${i + 1}`;
    imageWrapper.appendChild(img);
}

function showImage(index) {
    imageWrapper.children[currentImage].classList.remove('active');
    const img = imageWrapper.children[index];
    img.classList.add('active');

    const backgroundBlur = document.querySelector('.background-blur');
    backgroundBlur.style.backgroundImage = `url(images/image${index + 1}.jpeg)`; // Updated image path
    backgroundBlur.style.opacity = 1;

    currentImage = index;
}

prevBtn.addEventListener('click', () => {
    let nextImage = (currentImage - 1 + imageCount) % imageCount;
    showImage(nextImage);
});

nextBtn.addEventListener('click', () => {
    let nextImage = (currentImage + 1) % imageCount;
    showImage(nextImage);
});

let autoRotateInterval;

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        let nextImage = (currentImage + 1) % imageCount;
        showImage(nextImage);
    }, 3000);
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

startAutoRotate();

carousel.addEventListener('mouseenter', stopAutoRotate);
carousel.addEventListener('mouseleave', startAutoRotate);

showImage(0);