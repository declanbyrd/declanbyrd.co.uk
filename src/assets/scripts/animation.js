document.querySelectorAll('.photo-item').forEach((photo) => {
  photo.addEventListener('load', () => {
    photo.classList.add('loaded');
  });
});
