---
title: Room for improvement
description: A to-do list of all the things that I would like to change or investigate for declanbyrd.co.uk throughout 2024.
tags: ['article', '2024 to-do list']
date: 2024-01-17
permalink: '/journal/2024/room-for-improvement/'
---

## What is this?

Every time I try to write a post I find something on this site that distracts me and I start thinking about how I would change it. I also never document what it is that I got distracted by. I could have created a GitHub issue, or created a row in a spreadsheet, or build my own to-do list tracker if I really wanted to overthink it all. Instead I'm writing it all in a markdown file on my website.

## What happens when something is completed?

Checkboxes don't have any context. Was it implemented? Why was it done a particular way?

Instead, each item will be a post in the journal which I will link to from this page. That post will document what I did, why I did it, and give me a point of reference if a particular item requires multiple iterations.

## The list

_Last updated 17 January 2024_.

- Site navigation.
  - Currently the navigation links are split between the header and footer.
  - Can I consolidate all of the navigation links into a single location?
- An RSS feed with everything in it.
  - Currently the "main" RSS feed for declanbyrd.co.uk only contains posts in the journal.
  - Investigate how the photos RSS feed can be integrated into the "main" RSS feed.
  - Create an RSS feed for the books that I've read and integrate it into the "main" RSS feed.
- Make this list easier to update.
  - To add or edit any item in this list I need to update the markdown file containing the whole list.
  - Can each item be stored in such a way that takes advantage of 11tys directory level data files and templating?
- Multiple themes.
  - I already have [themes.json](https://github.com/declanbyrd/declanbyrd.co.uk/blob/3f4e53969654e02d7e6ffca216e615e421b16de3/src/data/tokens/themes.json) which contains the colour themes for declanbyrd.co.uk.
  - The current theme switcher only toggles between light and dark.
  - If there are more than two themes, how can the theme be changed?
  - Can fonts be applied per theme while only requesting the font for the applied theme?
- A more human homepage.
  - I never introduce myself anywhere on this site.
  - The homepage only shows the latest updates from collections that I update.
  - Create an introduction section on the homepage that makes my personal website a bit more personal.
