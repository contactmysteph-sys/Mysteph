const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('modal-prev');
const nextBtn = document.getElementById('modal-next');

let zoomLevel = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

let currentImages = [];
let currentIndex = 0;

function resetImage(){
  zoomLevel = 1;
  currentX = 0;
  currentY = 0;
  modalImg.style.transform = `translate(0px, 0px) scale(1)`;
}

function openImage(img){
  currentImages = Array.from(document.querySelectorAll(
    '.zoomable, .photo-grid img, .photo-row img'
  ));

  currentIndex = currentImages.indexOf(img);

  resetImage();

  modal.style.display = 'flex';
  modalImg.src = img.src;
}

function showImage(index){
  if(currentImages.length === 0) return;

  if(index < 0){
    index = currentImages.length - 1;
  }

  if(index >= currentImages.length){
    index = 0;
  }

  currentIndex = index;
  resetImage();
  modalImg.src = currentImages[currentIndex].src;
}

document.addEventListener('click', (e) => {
  if(e.target.matches('.zoomable, .photo-grid img, .photo-row img')){
    openImage(e.target);
  }
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if(e.target === modal){
    modal.style.display = 'none';
  }
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

document.addEventListener('keydown', (e) => {
  if(modal.style.display !== 'flex') return;

  if(e.key === 'Escape'){
    modal.style.display = 'none';
  }

  if(e.key === 'ArrowLeft'){
    showImage(currentIndex - 1);
  }

  if(e.key === 'ArrowRight'){
    showImage(currentIndex + 1);
  }
});

modalImg.addEventListener('wheel', (e) => {
  e.preventDefault();

  if(e.deltaY < 0){
    zoomLevel += 0.15;
  } else {
    zoomLevel -= 0.15;
  }

  zoomLevel = Math.max(0.5, Math.min(zoomLevel, 3));

  modalImg.style.transform =
    `translate(${currentX}px, ${currentY}px) scale(${zoomLevel})`;
});

modalImg.addEventListener('mousedown', (e) => {
  if(zoomLevel <= 1) return;

  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;

  modalImg.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if(!isDragging) return;

  currentX = e.clientX - startX;
  currentY = e.clientY - startY;

  modalImg.style.transform =
    `translate(${currentX}px, ${currentY}px) scale(${zoomLevel})`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  modalImg.style.cursor = 'grab';
});