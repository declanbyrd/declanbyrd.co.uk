---
title: Responsive sizing with CSS
description: How to use css functions such as min() to create a fallback for clamp()
tags: ['CSS', 'Responsive Design']
date: 2020-07-20
---

When I first started learning web development at university, I was taught that a media query should be used to modify styles to target a specific screen size. For example, if a site made the heading text smaller on mobile devices to show more content on the user's screen. This would involve writing CSS similar to the snippet below.

```css
.heading {
  font-size: 16px;
}

@media screen and (min-width: 480px) {
  .heading {
    font-size: 48px;
  }
}
```

To summarise the code above, if the device used to view the page has a screen width of greater than 481 pixels, then all elements with a class of heading will have a font size of 48 pixels. Therefore, on any device with a screen width of 480 pixels or less, all elements with a class of heading will have a font-size of 16 pixels.

Using media queries to change styles based on different device dimensions can be problematic for a few reasons:

- Breakpoints need to be set for every device that will view the website. This often causes overlap between devices such as a small tablet and a large phone.
- The CSS becomes less readable when styles are defined multiple times for each breakpoint.

One way that styles like font size can be more responsive is to use the `clamp()` function in CSS. This function takes three parameters which define the minimum value, the in-between value and the maximum value.

```css
.heading {
  font-size: clamp(16px, 2vw, 48px);
}
```

For the font size to scale based on the size of the device's screen, viewport widths are used in the code above. Viewport widths (vw) are a unit that is used to measure fractions of the browser window, so 2vw is equivalent to 2% of the width of the browser window. So to summarise the CSS snippet, the font size will be 2% of the width of the browser window unless it is smaller than 16 pixels or greater than 48 pixels.

The good news is that `clamp()` is largely supported by most major browsers as shown in the image below. However, recent versions of Safari and iOS Safari did not provide support for `clamp()` so a fallback option is required.

<!-- markdownlint-disable MD033 -->
<picture>
  <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/css-math-functions.webp">
  <source type="image/png" srcset="https://caniuse.bitsofco.de/image/css-math-functions.png">
  <img style="margin: 3rem auto" src="https://caniuse.bitsofco.de/image/css-math-functions.jpg" alt="Data on support for the css-math-functions feature across the major browsers from caniuse.com">
  <caption>
</picture>

From the data provided by [can I use](https://caniuse.com/), we can see that the `min()` and `calc()` functions are supported in the versions of Safari and iOS Safari where `clamp()` is not supported. Therefore, the two functions can be combined to create a fallback which is shown below.

```css
.heading {
  font-size: min(calc(16px + 1vw), 48px);
}
```

For the fallback option, the font size will be no smaller than 16 pixels plus 1% of the device's screen width and no larger than 48 pixels. This method will still allow the font size to scale with the size of the screen while maintaining a maximum value of 48 pixels that the font size should not be larger than and a minimum value of 16 pixels that the font size should not be smaller than.

As there are still some browsers that do not support the `min()` and `calc()` functions, it is always good to provide an additional fallback to guarantee that the font size will still be set to a minimum value. This results in the snippet shown below.

```css
.heading {
  font-size: 16px;
  font-size: min(calc(16px + 1vw), 48px);
  font-size: clamp(16px, 2vw, 48px);
}
```

The unit values can also be changed to use rem and em, as shown below.

```css
.heading {
  font-size: 1rem;
  font-size: min(calc(1rem + 1vw), 3rem);
  font-size: clamp(1rem, 2vw, 3rem);
}
```

While the snippets on this page have focused on making the font size respond to the width of the screen, other properties such as padding and margin can also be set using the same methods. This creates scalable web pages without using hard-coded breakpoints that are tailored to specific device widths.

### Useful Resources

- [Using Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) from the Mozilla Developer Network (MDN) documentation.
- [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) from the Mozilla Developer Network (MDN) documentation.
- [min()](https://developer.mozilla.org/en-US/docs/Web/CSS/min) from the Mozilla Developer Network (MDN) documentation.
- [This tweet](https://twitter.com/heydonworks/status/1255462784088891392) from Heydon Pickering on an progressively enhanced `clamp()` fallback.
