---
title: 2023 Week Notes - Week 27
date: 2023-07-10
description: "API requests at build time and  Fantasy Premier League"
---

I started playing Marvel’s Spider-Man: Miles Morales on the PS5 this week. It's feeling very similar to the first Spider-Man game but with a couple of new combat controls. My strategy of completing side missions early on in the game means that I haven't progressed the story very far. I earned 12 PlayStation trophies though, so it at least feels like I've done something.

I went for a run on Monday, managing 5 and half kilometres in 44 minutes. Its not the fastest, but I felt good by the end of it. Running into the wind was a bit challenging though I'm glad it wasn't raining like it did in the later half of the week. I didn't manage to run on any other days but that's something that I'm trying to work on.

I set-up my fantasy Premier League team for the new season. Most of the players I picked are placeholders since it is too early to tell how often some of the players will play. I found an API endpoint towards the end of the last season that would allow me to display how my team is getting on as the season progresses, so I had a look at using D3 with Eleventy. Unfortunately I couldn't get anything working, so I need to explore other libraries that could render charts without client-side JavaScript or write my own implementation.

I also looked into decreasing the number of API calls that my site makes at build time. Each book that I have read has all the details about that book fetched from the Google Books API, so there are quite a few requests being made. There is also the issue of the API returning unexpected values such as the author's name in capital letters. Ideally I would like the book data to be written in the file's frontmatter so that I can edit it if needed. My current thinking is to use a Node.JS script outside of my website's source code to create a file with the fetched data already in it. 

## What has changed on this site:

- All future Mastodon posts will have timestamps that are displayed in UK time.
- Sometimes the Google Books API returns the author's name in all capital letters. I now have a way of overriding the name so that if the API returns a bad value, I can use local value instead.

## What I've been reading:

- I read [Guardians of the Galaxy Omnibus Vol. 1 by Brian Michael Bendis](/reading/9781804910542/).

- I read [Secret Wars by Jonathan Hickman, Esad Ribic](/reading/9781846536892/).

- I started reading [A Man Called Ove by Fredrik Backman](/reading/#now).


## What I've been watching:

- [Convenience (2015)](https://www.themoviedb.org/movie/226268).
- [Episode 3 in season 1 of Secret Invasion.](https://www.themoviedb.org/tv/114472/season/1/episode/3)
- [Season 1 of Tour de France: Unchained](https://www.themoviedb.org/tv/225335/season/1/).
