'use strict';

// Add a loaded class to photos triggering a fade in transition.
const addPhotoTransitions = () => {
  document.querySelectorAll('.photo-item').forEach((photo) => {
    photo.classList.add('loaded');
  });
};

window.addEventListener('load', () => {
  addPhotoTransitions();
});
