---
title: 2023 Week Notes - Week 22
date: 2023-06-05
description: Holiday in San Sebastián, a now page, and scraping.
---

This week I was on holiday in San Sebastián. The weather was pretty good for the duration of our stay, apart from maybe 15 minutes of rain on our way to dinner one evening. It was very warm though. I struggled a bit with the heat, particularly at night.  Ordering food was a bit of a challenge. I tried to order some pintxos a few times, but most of the dishes didn't have labels so I was having to guess what the food was while I was ordering it. It didn't go badly, but it's something I wished I was better prepared for.

Despite being on holiday, I found it really difficult to relax. I probably should have allowed myself more time to have a break either side of the trip. 

I was playing The Legend of Zelda: Tears of the Kingdom while on the plane. The game is starting to feel a bit too similar to Breath of the Wild in that I already know what I'm looking for and so I'm not trying to explore as much as I did in the previous game. It's still a lot of fun though.

I had a very large spike in traffic to my site this week, with 213 visitors on Tuesday. Given that the previous week had 15 unique visitors and I didn't publish anything, I was interested to understand why I had a large spike in traffic. It looks like someone was trying to scrape my site and was using a new browsing context for each page they were visiting. Ideally I would have liked to know before that happened so I could have pointed them to the source code which is on GitHub instead.

Fresh off completing a course of antibiotics for a tonsil infection, I now appear to have a grass pollen allergy.

I had a bit of a lightbulb moment while trying to work out how to get the games I'm currently playing on to my site. I use [Raindrop.io](https://raindrop.io/) to collect bookmarks. Raindrop scrapes the site you have bookmarked to find an image that it can use as a thumbnail next to the bookmark. I realised I could bookmark the page for the game I'm playing (either the Nintendo website or the PlayStation website) and Raindrop would extract the cover art for that game. I can then query the Raindrop API to get the games I'm playing. There's no play time information or achievements, but the games are now listed on my [now page](/now/).

## What has changed on this site:

- I updated the alt text I used for the open graph images and social posts.
- I added some [photos](/photos/) from my time in San Sebastián.
- I have a [now page](/now/)!
- I restructured my global data files so that I can use `now.reading`, `now.gaming` and `now.watching` to access the data for the now page.
- I removed the descriptions for the navigation items in the footer.

## What I've been reading:

- No reading this week.

## What I've been watching:

- Episode 9 and episode 10 in [Season 15 of Taskmaster](https://www.themoviedb.org/tv/63404-taskmaster/season/15).
- [Episode 1 in season 1 of Connect](https://www.themoviedb.org/tv/137043/season/1/episode/1).
