---
title: Colophon
description: Documenting the tools that were used to make declanbyrd.co.uk.
layout: timestampedPage
date: Last Modified
eleventyComputed:
  eleventyNavigation:
    key: '{{ title }}'
    description: '{{ description }}'
---

<section class="flow">

<blockquote class="[ callout ]">An inscription at the end of a book or manuscript usually with facts about its production.</blockquote>

## Stack

This site was built using [Eleventy](https://www.11ty.dev/) with Nunjucks templates. It is being hosted on [Netlify](https://www.netlify.com/).

## Icons and Logos

The social icons are from [Super Tiny Icons](https://github.com/edent/SuperTinyIcons) and I have modified the colours to match the site theme by using CSS variables for the stroke and fill.

The icon that appears on my photos where there is more than one photo from a particular day is from the Material Design Outline pack in [Icons8](https://icons8.com/icon/set/photo-video/material-outlined). I was able to export the icon as an SVG from Icons8 thanks to the subscription available in the [GitHub Student Developer Pack](https://education.github.com/pack#icons8) which I used while I was at university.

The logo for this site was generated in [Profile Pic Maker](https://pfpmaker.com/).

The icons in the journal are from [feather icons](https://feathericons.com/).

## Typography

All headings use the [Quattrocento](https://fonts.google.com/specimen/Quattrocento) font which was downloaded using the [google-webfonts-helper](https://gwfh.mranftl.com/fonts).

All other text uses your device's system font.

## Fluid Design

The sizing tokens for typography are generated using the [fluid type scale generator on Utopia.fyi](https://utopia.fyi/type/calculator?c=310,18,1.333,1240,24,1.333,5,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,l,xl,12). The spacing tokens were generated using the [fluid space generator on Utopia.fyi](https://utopia.fyi/space/calculator?c=310,18,1.333,1240,24,1.333,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,&g=s,l,xl,12).

## Data Sources

My Mastodon posts are collected using [eleventy-plugin-mastoarchive](https://www.npmjs.com/package/eleventy-plugin-mastoarchive).

To fetch the book cover and data for each book, [node-isbn](https://www.npmjs.com/package/node-isbn) is used.

The list of tv and film that I've watched recently are sourced from Trakt.tv using the [API](https://trakt.docs.apiary.io).

The video games I'm currently playing are fetched using the [Raindrop.io API](https://developer.raindrop.io/). I bookmark the game's page on the console's website, which Raindrop.io extracts images from and I add a tag for the console that I played the game on.

</section>
