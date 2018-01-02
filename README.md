# xwing-load-xws

A simple Node module that turns URLs into XWS JSON objects by parsing the url and fetching the XWS from the appropriate endpoint.

## Motivation

In several projects I wanted to resolve a squad builder url to that squad's XWS object. I found myself copy-pasting some snippets of code between those projects, that I later had to update every time I wanted to support a new endpoint. 

I've created this module so I can build it once and re-use it everywhere I need it.

## Install

Install using `yarn` or `npm`:

```
$ yarn add xwing-load-xws
```

```
$ npm install xwing-load-xws --save
```

## API

### fromURL(url)

- `url` A string representing the squad URL for fetching
- Returns: `Promise<Object|False>`

This method will first check if `url` matches any of the [supported integrations](#supported-integrations). If so, it will parse the url, turn it into the correct URL that points to the XWS and perform a HTTP(S) request.

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
import loadXWS from 'xwing-load-xws';

const url = 'http://geordanr.github.io/xwing/?f=Galactic%20Empire&d=v4!s!22:170,243:23:25:U.124&sn=Squad%20Example&obs=';

// Using promises
loadXWS.fromUrl(url).then(
  xws => {
    console.log(xws);
  },
  err => {
    console.error(err);
  }
);

// Using async/await
(async () => {
  try {
    const xws = await loadXWS.fromUrl(url);
    console.log(xws);
  } catch (err) {
    console.error(err);
  }
})();
```

## Supported integrations

A URL will be matched against the following endpoints (in order):

1. [(Yet Another) Squad Builder](http://geordanr.github.io/)
2. [Voidstate](http://xwing-builder.co.uk/build)
3. [Fab's Squadrons Generator](http://x-wing.fabpsb.net/)
4. [Meta-Wing](http://meta-wing.com/)

