---
title: Get your last played Spotify track using Netlify Graph
description: How I used Netlify Graph to generate a serverless function that would fetch my last played track from Spotify while handling authentication.
tags: ['Netlify Graph', 'API', 'article']
date: 2022-03-09
---

## Some Background

One feature I had been trying to add to my personal site for a long time has been to show my last played track from Spotify. The issue with consuming data from the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for this use case is that it uses OAuth 2.0 and so distributes access tokens which expire and therefore need to be refreshed. It is possible to achieve this using the Spotify Web API as [Henry Desroches has shown](https://henry.codes/writing/spotify-now-playing/) in his tutorial for creating a now playing widget with Netlify functions.

[Netlify Graph](https://www.netlify.com/blog/announcing-netlify-graph-a-faster-way-for-teams-to-develop-web-apps-with-apis) connects your Netlify site to a range of APIs and handles the authentication for you while only needing to grant access once. One of the APIs that it can connect to is the Spotify Web API.

## Creating a Spotify application

As I only wanted to fetch my own data from Spotify and don't want to authenticate each request I created a Spotify application by accessing the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). In the dashboard, I created an app using the name of my personal site and a description of getting the last played track for my personal site.

On the dashboard there are two important pieces of data to make note of. The client ID and Client secret, which are both needed to connect the Spotify application to Netlify Graph.

## Netlify Graph

To access serverless functions during development I used the netlify-cli to start a development server and a `netlify.toml` file. In the `netlify.toml` file I added a section that would tell netlify and the netlify cli where my serverless functions are located. I chose to put my serverless functions inside `.netlify/functions`.

```toml
[functions]
  directory = ".netlify/functions"
```

> Before starting a development server with netlify-cli, you may need to login to Netlify and connect your site.
>
> ```shell
> npx netlify login
> npx netlify link
> ```

To start the development server with Netlify Graph, I navigated to the project's directory and then started the netlify-cli with the graph flag.

```shell
npx netlify dev --graph
```

## Connecting Spotify to Netlify Graph

To connect Spotify to Netlify graph, I opened my site page on Netlfiy and then navigated to the graph page. On the graph page I clicked the link to connect an API or service and then selected Spotify from the list of providers.

<figure>
  {% image "/img/journal/netlify-graph-spotify.jpg", "A screenshot of the Connect to APIs and services screen for connecting a Netlify site to the Spotify API. The screenshot has options for connecting to Spotify that are: 'Configure API authentication for Spotify to simplify token management' and 'Enable Graph Explorer to query Spotify from builds or Functions'." %}
  <figcaption>Connecting Spotify to a Netlify site with Netlify Graph.</figcaption>
</figure>

I chose to add a client so that I could connect the Spotify application I created and use it to authenticate the requests. This is where I entered the client id and client secret for the Spotify application. Enabling the Graph Explorer will create a GraphQL playground to try out the Spotify connection.

Running the netlify-cli dev command with the graph flag has created a connection between the Netlify dashboard and my project so clicking the "Start querying Spotify" button showed one live connection which linked to the Graph Explorer.

## Graph Explorer

As the Spotify connection requires authentication, I logged in to Spotify by clicking the "log in to Spotify" button in the authentication dropdown menu.

By selecting only the data I needed from the explorer, I ended up with the query below.

```graphql
query GetLatestTracks {
  me {
    spotify {
      recentlyPlayed(first: 1) {
        nodes {
          track {
            artists {
              name
            }
            name
            externalUrls {
              spotify
            }
          }
          playedAt
        }
      }
    }
  }
}
```

This asks for the...

- Last played track's name.
- Last played track's artist(s).
- Link to the track in Spotify.
- Timestamp that the track was listened to.

The response looks like this:

```json
{
  "data": {
    "me": {
      "spotify": {
        "recentlyPlayed": {
          "nodes": [
            {
              "track": {
                "artists": [
                  {
                    "name": "Daft Punk"
                  }
                ],
                "name": "One More Time - Radio Edit [Short Radio Edit]",
                "externalUrls": {
                  "spotify": "https://open.spotify.com/track/2Uy6EhQXAYkXA6MohPgjpV"
                }
              },
              "playedAt": "2022-03-08T15:44:29.362Z"
            }
          ]
        }
      }
    }
  },
  "extensions": {
    "metrics": {
      "api": {
        "avoidedRequestCount": 0,
        "requestCount": 2,
        "totalRequestMs": 141,
        "byHost": [
          {
            "host": "api.spotify.com",
            "requestCount": 2,
            "totalRequestMs": 141,
            "rateLimit": null
          }
        ]
      }
    }
  }
}
```

One of the really cool things about using Netlify graph is that after creating a query, it can be synced back to the codebase for that site. Clicking "Generate Handler" from inside the actions dropdown menu created a Netlify function in my project. This was really impressive!

The only part of the generated function that I changed was to uncomment the lines below so that the authentication is handled by the Spotify application that I had created, rather than using client side authentication.

```javascript
// If you want to use the API with your own access token:
accessToken = event.authlifyToken;
```

Finally I added a redirect to `netlify.toml` so that the generated function would be available at `/api/getLatestTracks`.

```toml
[[redirects]]
  from = "/api/latestTracks"
  to = "/.netlify/functions/GetLatestTracks"
  status = 200
```

## Wrapping up

I've used a HTML `<template>` to render the data, but getting data from netlify graph is client-agnostic so you can take your pick of client side framework (or of course no framework too).

I did find during development that there were a few times where the function would return an authentication error. This has become much less frequent and I haven't seen it all lately, but re-running `npx netlify dev --graph` seemed to fix it.

The album art for the last played track was the only piece of data that I found was missing from the Spotify API. You could get the album art from the player but this would return null if no track was being listened to when the data was requested.

While Netlify graph does create vendor lock-in, the benefits of using it in this case made it an easy choice given that my site was already being hosted on Netlify. The overall experience with Netlify graph was positive and it will be interesting to see which other services/APIs are added in the future.
