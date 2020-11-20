'use strict';

/**
 * Dark mode toggle from Andy Bell
 * https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/
 */

document.documentElement.classList.remove('no-js');

const COLOR_STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';
const themeToggle = document.getElementById('themeToggle');

const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );

  if (response.length) {
    response = response.replace(/\"/g, '').trim();
  }

  return response;
};

const applySetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(COLOR_STORAGE_KEY);
  if (currentSetting) {
    document.documentElement.setAttribute(
      'data-user-color-scheme',
      currentSetting
    );
  }
};

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(COLOR_STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(COLOR_STORAGE_KEY, currentSetting);

  return currentSetting;
};

document.getElementById('themeToggle').addEventListener('click', (evt) => {
  evt.preventDefault();
  applySetting(toggleSetting());
});

applySetting();

const FONT_STORAGE_KEY = 'user-font-choice';
const FONT_MODE_KEY = '--font-choice';
const fontToggle = document.getElementById('fontToggle');

const applyFontSetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(FONT_STORAGE_KEY);
  if (currentSetting) {
    document.documentElement.setAttribute('data-user-font', currentSetting);
  }
};

const toggleFontSetting = () => {
  let currentSetting = localStorage.getItem(FONT_STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(FONT_MODE_KEY) === 'dyslexic' ? 'default' : 'dyslexic';
      break;
    case 'default':
      currentSetting = 'dyslexic';
      break;
    case 'dyslexic':
      currentSetting = 'default';
      break;
  }

  localStorage.setItem(FONT_STORAGE_KEY, currentSetting);

  return currentSetting;
};

document.getElementById('fontToggle').addEventListener('click', (evt) => {
  evt.preventDefault();
  applyFontSetting(toggleFontSetting());
});

applyFontSetting();

const autofitGrid = document.querySelector('.autofit-grid');

const thumbnails = autofitGrid.querySelectorAll('source');

thumbnails.forEach((thumb) =>
  thumb.setAttribute('sizes', '(max-width: 1120px) 50vw, 450px')
);
