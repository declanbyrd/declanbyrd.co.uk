---
title: Theme Switcher
description: Building a theme switcher for my website.
tags: ['article', 'Changelog', 'Eleventy']
date: 2024-03-28T13:03:59+00:00
---

In my [2024 to-do list post](/journal/2024/room-for-improvement/) I noted that I wanted to be able to change the colour theme to something other than a dark or light theme. I didn't really like the existing theme toggle and thought the lightbulb icon that I used didn't really represent the action of toggling the colour theme between light and dark.

During the process of [writing about every basketball shoes that I've every played in](/journal/2024/basketball-shoes/), my brother asked why I was trying so hard to identify some of the shoes. I made the case for completeness and wanting an accurate log. What I conveniently left out of the conversation was that I also wanted to use the colours of the shoes as themes for my website.

## Creating themes

I already had a dark theme and a light theme for my website. The colours for these themes lived in a JSON file inside my Eleventy data directory. The JSON file contained the following:

```json
{
  "dark": {
    "background": "#1a1a1a",
    "external-link": "#c1a91f",
    "visited": "#c9bf86",
    "text-color": "#f6f6f6",
    "code-background": "#000"
  },
  "light": {
    "background": "#f6f6f6",
    "external-link": "#891e26",
    "visited": "#34090f",
    "text-color": "#1a1a1a",
    "code-background": "#1a1919"
  }
}
```

To add more themes, I created objects that were named after each pair of basketball shoes, added the object keys, and left the values empty. What followed can only be described as hours of inspecting individual pixels using the [Windows Color Picker utility in PowerToys](https://learn.microsoft.com/en-gb/windows/powertoys/color-picker) and then determining if the colour combinations were [WCAG AAA compliant](https://www.w3.org/TR/WCAG21/#contrast-enhanced) using Firefox's accessibility checker. Turns out, not all my basketball shoes use colour combinations that have a contrast ratio of at least 7:1.

Once I had themes for each pair of shoes, I started to remove themes that were similar. I didn't need four themes where the background was the same shade of dark grey. I also removed the dark and light themes that I had created previously as these were similar to the `andOneOpenRun` and `airJordanTeamIso5` themes. Some additional change that I made later, but want to introduce here is that I added a human readable name for each theme and a path to an image of the shoes that each theme were based on. This resulted in the following JSON file:

```json
{
  "andOneOpenRun": {
    "name": "AND1 Open Run",
    "thumbnail": "/img/theme-icons/and1-open-run.png",
    "colours": {
      "background": "#17191a",
      "external-link": "#f2682c",
      "visited": "#d35b26",
      "text-color": "#fdfcff",
      "code-background": "#000000"
    }
  },
  "airJordanTeamIso5": {
    "name": "Air Jordan Team ISO 5",
    "thumbnail": "/img/theme-icons/air-jordan-team-iso.png",
    "colours": {
      "background": "#eeece8",
      "external-link": "#ad2010",
      "visited": "#520f02",
      "text-color": "#101610",
      "code-background": "#000000"
    }
  },
  "kobe5": {
    "name": "Nike ID Kobe 5",
    "thumbnail": "/img/theme-icons/nike-kobe-5.png",
    "colours": {
      "background": "#1f2029",
      "external-link": "#EC986F",
      "visited": "#E29C7E",
      "text-color": "#cdc9c4",
      "code-background": "#000000"
    }
  },
  "nikeHyperdunk2014": {
    "name": "Nike Hyperdunk 2014",
    "thumbnail": "/img/theme-icons/nike-hyperdunk-2014.png",
    "colours": {
      "background": "#1d2e20",
      "external-link": "#b9d885",
      "visited": "#94c734",
      "text-color": "#bec0c1",
      "code-background": "#1b1d1a"
    }
  }
}
```

## Nunjucks templating

I have a Nunjucks template that used to create CSS variables for each theme. Previously, this only handled the light and dark themes so I had to make some changes here too. The more obvious changes, were that the light and dark themes that I used previously no longer exist so these were changed to use the `airJordanTeamIso5` theme for 'light' mode and `andOneOpenRun` for 'dark' mode.

In my template, I then had the following:

```twig
:root {
  {% raw %}
  {# Light theme variables by default #}
  {% for token, value in tokens.themes.airJordanTeamIso5.colours %}
    --{{token}}: {{value}};
  {% endfor %}

  {# set properties to default variable values #}
  background: var(--background);
  color: var(--text-color);
}


@media (prefers-color-scheme: dark) {
  html {
    {% for token, value in tokens.themes.andOneOpenRun.colours %}
      --{{token}}: {{value}};
    {% endfor %}
  }

  html:not([data-user-color-scheme]) {
    {% for token, value in tokens.themes.andOneOpenRun.colours %}
      --{{token}}: {{value}};
    {% endfor %}
  }
}
{% endraw %}
```

With default cases now handled, I loop over the theme data object to add variables for each theme colour scheme.

```twig
{% raw %}
{% for theme, data in tokens.themes %}
  [data-user-color-scheme={{theme}}] {
    {% for token, value in data.colours %}
      --{{token}}: {{value}};
    {% endfor %}
  }
{% endfor %}
{% endraw %}
```

The theme template is then injected into my base layout using the Nunjucks include syntax.

```twig
{% raw %}
    {% set css %}
    {% include "css/theme.njk" %}
    {% endset %}
    <style>
      {{css | cssmin | safe}}
    </style>
    {% endraw %}
```

## Theme Switcher Partial

I created a partial for the theme switcher so that I could include it in my layout templates. The partial loops over the theme data and creates a button for each theme containing the image of the shoe and some screen reader only text.

```twig
{% raw %}
<div>
  {% for themeName, data in tokens.themes %}
    <button data-theme={{themeName}} aria-pressed="false">
      {% image data.thumbnail, "", "[ theme-icon ]"  %}
      <span class="visually-hidden">
        Change the site theme to use the colours from Declan's {{data.name}} basketball shoes.
      </span>
    </button>
  {% endfor %}
</div>
{% endraw %}
```

This partial is then added to the footer of my base layout using a Nunjucks include block.

```twig
{% raw %}
{% include 'partials/themeSwitcher.njk' %}
{% endraw %}
```

## Some JavaScript

I previously followed [Andy Bell's user controlled dark or light mode](https://piccalil.li/blog/create-a-user-controlled-dark-or-light-mode) post when I created the theme toggle on my website. This worked great when there were only two themes to choose between, and I started to adapt this to accept multiple themes. Then I read [Max Böck's article on creating their own colour theme switcher](https://mxb.dev/blog/color-theme-switcher/) and changed the whole approach, modifying the `ThemeSwitcher` class they created to support the themes I created.

This resulted in the following:

```js
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
```

## Try it out

There are now four images of basketball shoes in my website's footer which when clicked, will change the colours of the website to match the colours of those basketball shoes.

I can't guarantee that the next pairs of basketball shoes that I own will also have a colour contrast ratio of 7:1 or higher, but if they do there will be more themes to choose from.
