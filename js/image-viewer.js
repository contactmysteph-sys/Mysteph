const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');

let zoomLevel = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    zoomLevel = 1;
    currentX = 0;
    currentY = 0;

    modal.style.display = 'flex';
    modalImg.src = img.src;

    modalImg.style.transform =
      `translate(0px, 0px) scale(1)`;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if(e.target === modal){
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    modal.style.display = 'none';
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