// @ts-check

'use strict';

document.documentElement.classList.remove('no-js');

const COLOR_STORAGE_KEY = 'user-color-scheme';

class ThemeSwitcher {
  constructor() {
    this.activeTheme = 'airJordanTeamIso5';
    this.hasLocalStorage = typeof localStorage !== 'undefined';
    this.themeChangerButtons = document.querySelectorAll('button[data-theme]');
    this.onLoad();
  }

  onLoad() {
    const systemPreference = this.getSystemPreference();
    const storedPreference = this.getStoredPreference();

    if (storedPreference) {
      this.activeTheme = storedPreference;
      this.setThemeButtonAriaPressed(storedPreference);
    } else if (systemPreference) {
      this.activeTheme = systemPreference;
      this.setThemeButtonAriaPressed(systemPreference);
    }

    Array.from(this.themeChangerButtons).forEach((button) => {
      const themeId = button.getAttribute('data-theme');
      // @ts-ignore
      button.addEventListener('click', () => this.setTheme(themeId));
    });
  }

  getSystemPreference() {
    if (window.matchMedia('(preferes-colour-scheme: dark)').matches) {
      return 'andOneOpenRun';
    }

    return false;
  }

  getStoredPreference() {
    if (this.hasLocalStorage) {
      return localStorage.getItem(COLOR_STORAGE_KEY);
    }
    return false;
  }

  /**
   * @param {string} themeId
   */
  setThemeButtonAriaPressed(themeId) {
    const themeButton = document.querySelector(`[data-theme=${themeId}]`);
    document
      .querySelector('[data-theme][aria-pressed="true"]')
      ?.setAttribute('aria-pressed', 'false');
    themeButton?.setAttribute('aria-pressed', 'true');
  }

  /**
   * @param {string } themeId
   */
  setTheme(themeId) {
    this.activeTheme = themeId;
    this.setThemeButtonAriaPressed(themeId);
    document.documentElement.setAttribute('data-user-color-scheme', themeId);

    if (this.hasLocalStorage) {
      localStorage.setItem(COLOR_STORAGE_KEY, themeId);
    }
  }
}

if (window.CSS && CSS.supports('color', 'var(--my-variable)')) {
  new ThemeSwitcher();
}
