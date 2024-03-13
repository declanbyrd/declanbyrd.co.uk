---
title: 'Changelog: a better introduction'
description: "In this post, I'm going to attempt to take note of my thought process when writing an introduction for my website."
tags: ['Changelog', 'article']
date: 2024-02-23
---

In my 2024 to-do list I noted that I never introduce myself on my own website. I've tried to include an introduction in previous iterations but I never felt I was truly happy with it. I eventually opted to just remove it completely rather than iterate on it.

In this post, I'm going to attempt to take note of my thought process when writing an introduction for my website. The aim is not have an introduction that is finished, never to be changed again. Instead, I aim to produce a point of reference. Something I can go back to later.

## Airplane mode

This would probably be the section where I share all the resources that I've found that have helped me. I've deliberately chosen not to here. Instead, I've worked on this offline and not used any resources available online to help structure or aid with the writing of my introduction.

## I am more than my job

Previous attempts at an introduction nearly always started with _"I'm a software engineer at..."_. I never really liked that the first thing I could say about me and my website was what I did for work. If this was a "_super professional business website for business people_" then leading with my job title makes sense.

I wanted my job to almost feel like a footnote - there but with almost no emphasis on it. This was harder than I had anticipated once I started writing, so I removed it altogether.

## Actually talking about what is on my website

I kind of forgot I was allowed to do this. I don't really know why, it seems kind of obvious on reflection. Like the introduction that I'm writing, my website is also permanently in progress so this should be mentioned somewhere.

Some of the pages that I can link to here are:

- The most recent week note (last week's notes).
- The rest of the journal.
- Photos page.
- Colophon.

## Moving now to the home page

I added a now page to experiment with pulling in up-to-date information from the various services that I use. I don't love the page though. I don't forget that its there, but I never feel like I have an actual update to make on that page. So really if I can include some of the data that I previously showed on the now page in my introduction, I can work on removing the now page altogether.

From the data that is on the now page, my introduction can contain the book that I'm currently reading, the game that I'm currently playing, and the last tv episode or film that I watched. I won't change any of the data fetching or formatting implementations here and instead represent the above as plain text.

## Putting it all together

Using what I noted above, I had a go at writing a minimum viable introduction. Any placeholders would be replaced with variables that I set at build time using Eleventy supplied data.

> Hi I'm Declan, and this is my permanently in-progress website.
>
> Here you will find my journal which includes a mixture of short notes, Mastodon posts, and longer pieces of writing.
>
> The journal also contains my week notes, in which I try to document what I do each week. There are some common themes such as any basketball games I have played in, any Brighton & Hove Albion football games that I've been to, and my media consumption. The most recent week note is (link to week note title here).
>
> A keen photographer, I also publish my photos to this website. These include photos that I've taken on my smartphone as well as my DSLR.
>
> Re-discovering the joy of reading books, I log all of the books that I've finished on this website. The last book I finished was (insert the title and author here) and right now I'm reading (insert the title and author here).
>
> I enjoy playing single player video games. At the moment I'm playing (game title) on the (insert console name here).
>
> If you want to know how this website was put together, everything I use is listed in the colophon.
