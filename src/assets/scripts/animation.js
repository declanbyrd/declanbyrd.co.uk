window.addEventListener('load', () => {
  document.querySelector('body').classList.add('loaded');
});

document.querySelectorAll('.photo-item').forEach((photo) => {
  photo.addEventListener('load', () => {
    photo.classList.add('loaded');
  });
});
