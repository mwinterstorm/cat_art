const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const imageCount = 20; // Update with your actual image count
let currentImage = 0;

const imageWrapper = document.querySelector('.image-wrapper');

// The HTML for your images is created here.
for (let i = 0; i < imageCount; i++) {
    const img = document.createElement('img');
    img.src = `images/image${i + 1}.jpeg`;
    img.alt = `Image ${i + 1}`;
    // Removed active class
    imageWrapper.appendChild(img);
}

function showImage(index) {
    // Remove 'active' class from the CURRENT image, not all
    imageWrapper.children[currentImage].classList.remove('active'); 

    const img = imageWrapper.children[index];
    img.classList.add('active');

    const backgroundBlur = document.querySelector('body >.background-container >.background-blur');    backgroundBlur.style.backgroundImage = `url(images/image${index + 1}.jpeg)`;
    backgroundBlur.style.opacity = 1;

    currentImage = index;
}

// Event listeners for the next and previous buttons.
prevBtn.addEventListener('click', () => {
    let nextImage = (currentImage - 1 + imageCount) % imageCount;
    showImage(nextImage);
});

nextBtn.addEventListener('click', () => {
    let nextImage = (currentImage + 1) % imageCount;
    showImage(nextImage);
});

// Automatically rotates the images.
let autoRotateInterval;

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        let nextImage = (currentImage + 1) % imageCount;
        showImage(nextImage);
    }, 3000);
}

// Stops the automatic rotation.
function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

// Starts and stops the automatic rotation when the mouse enters and leaves the carousel.
startAutoRotate();

carousel.addEventListener('mouseenter', stopAutoRotate);
carousel.addEventListener('mouseleave', startAutoRotate);

// Shows the first image when the page loads.
showImage(0);