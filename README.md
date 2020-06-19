# xwing-list-loader

![npm](https://img.shields.io/npm/v/xwing-list-loader?style=flat-square)
![GitHub](https://img.shields.io/github/license/guidokessels/xwing-list-loader?style=flat-square)

A simple Node module that takes squad builder URLs and returns the matching [XWS](https://github.com/elistevens/xws-spec) JSON object.

## Motivation

In several X-Wing projects I wanted to resolve a squad builder url to that squad's XWS object. I found myself copy-pasting snippets of code between projects that I later had to update every time I wanted to support a new endpoint. This wouldn't work in the long run so I created this module so I can build it once and re-use it everywhere.

## Installation

Install using `yarn` or `npm`:

```
$ yarn add xwing-list-loader
```

```
$ npm install xwing-list-loader --save
```

## API

### load(url)

- `url` A string representing the squad's URL
- Returns: `Promise<Object|false>`

This method will first check if `url` matches any of the [supported integrations](#supported-integrations). If so, it will parse the url, turn it into an URL that points to the XWS and perform a HTTP(S) request.

If valid XWS can be loaded from the given URL the promise will resolve with the XWS object.

The promise will resolve with `false` if:

- The given URL does not match any of the [supported integrations](#supported-integrations)
- The given URL does not return a valid XWS JSON object (= has no `pilots` or `faction` field)
- The request to fetch the XWS was unsuccessful (a response with status code != 2xx)

The promise will be rejected if:

- There are network/permission issues
- The response cannot be parsed as JSON

Example:

```js
import listLoader from 'xwing-list-loader';

const url =
  'https://raithos.github.io/?f=Galactic%20Republic&d=v8ZsZ200Z273XW2W201WY278XWW200WY333X123WWW&sn=Ani%2FObi%2FRic&obs=gascloud1,gascloud2,gascloud3';

// Using promises
listLoader.load(url).then(
  (xws) => {
    console.log(xws);
  },
  (err) => {
    console.error(err);
  }
);

// Using async/await
(async () => {
  try {
    const xws = await listLoader.load(url);
    console.log(xws);
  } catch (err) {
    console.error(err);
  }
})();
```

## Supported integrations

URLs will be matched against the following endpoints (in order):

Second Edition:

1. [(Yet Another) Squad Builder 2](http://raithos.github.io/)
2. Launch Bay Next ([Android](https://play.google.com/store/apps/details?id=com.launchbaynext&hl=en) / [iOS](https://apps.apple.com/us/app/launch-bay-next/id1422488966))
3. [Official FFG Squadbuilder](https://squadbuilder.fantasyflightgames.com)
4. [Meta-Wing2](https://meta.listfortress.com/)

First Edition:

4. [(Yet Another) Squad Builder](http://geordanr.github.io/xwing)
5. [Voidstate](http://xwing-builder.co.uk/build)
6. [Fab's Squadrons Generator](http://x-wing.fabpsb.net/)
7. [Meta-Wing](http://meta-wing.com/)

## License

[MIT](LICENSE)

---

Star Wars, X-Wing: The Miniatures Game and all related properties are owned by Fantasy Flight Games, Lucasfilm Ltd., and/or Disney.
