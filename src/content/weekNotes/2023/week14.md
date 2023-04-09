---
title: 2023 Week Notes - Week 14
date: 2023-04-10
description: Mastodon bots, raindrop bookmarks, deleting code.
---

On Monday, I was at the Brighton Centre with Becka to see [Dermot Kennedy](https://www.dermotkennedy.com/). Not really my kind of music but it was enjoyable.

I set-up my first Mastodon bot this week. The bot is registered on [sportsfeed.me](https://sportsfeed.me) which is an instance that had other accounts which were posting updates from sports team's RSS feeds. I used [IFTT](https://ifttt.com) to monitor the [RSS feed for Brighton & Hove Albion's website](https://www.brightonandhovealbion.com/rss.xml) and then send a webhook request to the Mastodon API that would publish the latest item in the RSS feed as a status on [sportsfeed.me](https://sportsfeed.me). I still need a profile icon for the account though, Brighton has strong brand guidelines that prevent logos synonymous with the club from being used without explicit permission. You can find the bot [here](https://sportsfeed.me/@BHAFC).

I've been experimenting with the idea of including a bookmarks page on my site. I was using [Raindrop.io API](https://developer.raindrop.io/) to fetch a list of bookmarks. Most of the problems I faced were around how to display the bookmarks on this site. Each bookmark would need some context around why I've bookmarked it, any quotes, and a tag so that I could group similar bookmarks. This will likely be something that I re-visit next week.

On Saturday, I went to the Tottenham Hotspur Stadium to watch [Brighton lose 2-1 against Spurs](https://www.brightonandhovealbion.com/news/3141215/kane-able-to-end-albions-unbeaten-away-run). Very frustrating game. I could easily rant here, but that wouldn't change the result or the fact that the Brighton players gave everything despite having every decision go against them.

  <figure>
    {% image "/img/journal/weeknotes/2023/week14.jpg", "View from the away end inside the Tottenham Hotspur Stadium, where there are two big screens located in each of the corners showing the score, current minute of the game, and a live feed of the pitch. Brighton, playing in crimson red are about to kick-off against Tottenham who are playing in white." %}
    <figcaption>Top of the PGMOL apology league.</figcaption>
  </figure>

## What has changed on this site:

- Some of the source code still contained references to `renderData` which was removed in 11ty 2.0. This meant some of the pages on this site were showing template placeholders in the page metadata. Those references have been updated to use `computedData` instead.
- [Netlify Graph is being deprecated](https://docs.netlify.com/netlify-labs/experimental-features/netlify-graph/) which meant I could delete some code. It was being used to fetch data about the last track I listened to on Spotify, but it was never really reliable.
- There are now five journal entries shown on the home page.

## What I've been reading:

- No reading this week.

## What I've been watching:

- [Season 2](https://www.themoviedb.org/tv/86248-upload/season/2) of [Upload](https://www.themoviedb.org/tv/86248-upload).
- [Episode 6 in Season 3](https://www.themoviedb.org/tv/82856-the-mandalorian/season/3/episode/6) of [The Mandalorian](https://www.themoviedb.org/tv/82856-the-mandalorian).
- [Episode 2 in Season 15](https://www.themoviedb.org/tv/63404-taskmaster/season/15/episode/2) of [Taskmaster](https://www.themoviedb.org/tv/63404-taskmaster).
- Episodes 2, 3, 4 and 5 in [Season 1](https://www.themoviedb.org/tv/218344-blue-lights/season/1) of [Blue Lights](https://www.themoviedb.org/tv/218344-blue-lights).
