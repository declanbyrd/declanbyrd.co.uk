---
title: Week Notes - Week 31
date: 2022-08-08
description: Performance fixes for this site and what else I've been up to over the last seven days.
tags: ['Week Notes']
---

This week started with a trip to the office. There were some IT issues with my laptop the last time I was in the office but those were quickly fixed and I was able to get some work done. I find it harder to concentrate in the office and missed the productive routines that I'd formed when working from home like when to take breaks and having long periods of productivity without interruptions.

My weekly basketball session was rather tiring. I had a longer warm-up than previous weeks and managed to find a good shooting rhythm but really struggled to shoot the ball consistently when the games started.

I've been playing a lot of [Lego Star Wars: The Skywalker Saga on the Nintendo Switch](https://www.nintendo.co.uk/Games/Nintendo-Switch-games/LEGO-Star-Wars-The-Skywalker-Saga-2157160.html). All of the story mode has been completed so I've been re-playing each episode on free-play. In story mode each level feels much longer (I guess because of the open world style missions that are used to prolong the story) but in free-play those levels only last about 10-15 minutes.

Brighton's season got off to a flying start as they [won 2-1 against Manchester United at Old Trafford](https://www.brightonandhovealbion.com/news/2729380/gross-at-the-double-as-albion-make-dream-start-to-the-season) and a great way to end the week!

## What has changed on this site:

- I made some performance fixes this week.
  - I resized the favicon png image to 64x64. If the browser supports it, an SVG favicon is loaded first, though the png fallback is often loaded too. Resizing the png favicon reduced the file size to kilobytes.
  - I removed some quote marks that were included in the URL of a font-face definition. Including the quote marks would load the font file from the URL. However, I wanted to preload the font and because the font file was already loaded I needed to treat the pre-loaded font file as a local one.
  - I inlined some SVG icons to reduce the number of http requests required to load the homepage.

## What I've been reading:

- A chapter of [Dark Matter by Blake Crouch](/reading/9781447297581/). Not been reading this as regularly as I would have liked so trying to get through a chapter (~20 pages) a week at the moment.
- Though I haven't read it, I did stumble across [Google's Site Reliability Engineering books](https://sre.google/books/) which I thought I'd bookmark here.

## What I've been watching:

- [Episode 7 in Season 2 of Only Murders in the Building](https://www.themoviedb.org/tv/107113-only-murders-in-the-building/season/2/episode/7).
- [Episodes 5 to 13 in Season 1](https://www.themoviedb.org/tv/4574-x-men/season/1) and [episodes 1 to 7 in season 2](https://www.themoviedb.org/tv/4574-x-men/season/2) of X-Men (1992).
- The [first 3 episodes of All or Nothing: Arsenal](https://www.themoviedb.org/tv/132376-all-or-nothing-arsenal/season/1). I find it interesting how other Premier league clubs operate but I was hoping for more clips of them failing to win against Brighton.
- Episodes 5 and 6 to finish [Season 1 of Avoidance](https://www.themoviedb.org/tv/203817-avoidance/season/1).
