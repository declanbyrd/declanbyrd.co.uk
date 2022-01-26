---
title: My experience with Google foo.bar
description: How I came across the invite only coding challenge created by Google to hire developers.
tldr: I stumbled upon an invite only coding challenge created by Google to hire developers. I did one challenge, in a language I haven't used in a few years, then realized I should do the rest once I no longer have university deadlines.
tags: ['Python', 'Code Challenge']
date: 2020-04-09
---

> TLDR: {{tldr}}

It's Thursday 9th April 2020, the UK is in its third week of lock down and I've been working on my dissertation in between Animal Crossing: New Horizons sessions during what would have been an Easter break.

I'd been doing Google searches for various terms related to my dissertation to make sure that I was describing technologies I was using correctly. As you would normally expect with a search, type what you want in the address bar in the browser and then it shows the search engine results below. My search engine of choice happened to be Google. One search decided to trigger something. I searched for dependency injection. It's how a dependency to a bit of code in one file can be injected into another file that doesn't have the dependency located within its scope. That's beside the point though, because this Google search decided to show what I thought was one of those cool Easter eggs like "do a barrel roll" or playing Atari breakout in google images.

<figure>
  {% image "/img/fooBar/page-reveal.jpeg", "Google search page showing link to Google foo.bar" %}
  <figcaption>The invitation.</figcaption>
</figure>

The top of the search results start to fall forward revealing a banner saying _"You're speaking our language. Up for a challenge?"_ and options to select either _"I want to play"_, _"No thanks"_ or _"Don't show this again"_. Wanting to make sure this wasn't that one search that had triggered this, I opened a new browser tab and did the same search again. Same result. The only difference was the message next to the options where it now read _"Curious developers are known to seek interesting problems. Solve one from Google?"_. Somewhat disappointed this wasn't a game but also wanting a break from my dissertation, I closed the second tab and on the original one clicked _"I want to play"_.

> "You're speaking our language. Up for a challenge?"

The screen folded outwards leaving the message on the screen before redirecting to a new site [foobar.withgoogle.com](https://foobar.withgoogle.com/). A terminal appears on the screen with the words _"Welcome to foobar"_ and on the line below _"Google has a code challenge ready for you"_.

What I had stumbled upon is a coding challenge normally hidden by companies so that any curious developers who find the link to the challenge end up doing a coding interview with a job prospect at the end of it. While I was on placement my supervisor and one of my co-workers had been compiling a list of ones they had found and then worked their way through them when they had a break but chose not to submit their details for an interview on completion. This one was different though. It was invite only.

> "Warning! Your invitation may expire if you leave this page. Sign in to save progress and resume later."

A quick Google search for _Google foo bar_ showed that the website was a secret process of hiring software developers but the selection process is based on search history. That's one way to take advantage of large amounts of user search data I guess.

Back in the terminal page there were instructions for what to do next.

```text
For a list of commands type help. To get started with your first challenge type request.
```

I typed in `request` hit enter and thought I'd take a look at what the challenge was but probably come back to it later if I got bored.

```text
You are about to begin a time-limited challenge which you will have 48 hours to complete.

Do you wish to proceed and start your first challenge?

[Y]es or [N]o:
```

By this point I was naive to think as long as I could submit my answers in Javascript I'll probably be able to do the first challenge. I got a nice little story about the evil Commander Lambda and how I was the world's only hope, followed by an indication that the 48 hour time limit was starting and where the challenge was located in the terminals file explorer. I won't explain the challenge or what my answer was in case Google decide to do their own search and find this blog post.

The instructions added more background to the work I would do to help sabotage Commander Lambda's plans and what my code was expected to do. It was going well, right up to the point where it said which languages could be used. Python or Java. I hadn't used either since my first year of university so I'm then sat there looking like the man face palming emoji (🤦‍♂️). I decide I should probably pick a language and do it there and then so the timer doesn't run out.

I eventually put together a Python solution using my first year notes that I'd backed up online as reference. There's a built in editor next to the terminal to put the code in but there's no error messages, syntax highlighting or indication that things are going right so I wrote mine in VS code. To see if the code works there's a `verify` command in the terminal that runs some unit tests. When they all pass, the code can be submitted and the timer stops.

<figure>
  {% image "/img/fooBar/challenge1-complete.jpg", "Submission successful. Completed in 1 hour, 58 mins, 1 second" %}
  <figcaption>Submission successful. Completed in 1 hour, 58 mins, 1 second.</figcaption>
</figure>

I finished the first challenge in 1 hour 58 minutes and 1 second although I did eat dinner while the clock was still running.

There's a progress indicator that appears showing your progress across 5 levels and a piece of animated ascii art above it. Each level is made up for more challenges with two challenges needed to complete level 2. Fortunately I can now finish the rest of the challenges at a much later date, like when I don't have university deadlines.

<figure>
  {% image "/img/fooBar/status-end-of-challenge1.jpg", "Table showing 100% for level 1" %}
  <figcaption>100% for level 1.</figcaption>
</figure>
