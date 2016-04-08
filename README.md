# es-deps-resolved

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> ECMAScript 2015+/CommonJS module dependencies resolved array

## Install

    npm install --save es-deps-resolved

## Usage

```js
import esDepsResolved from 'es-deps-resolved';

esDepsResolved('./fixtures')
  .then(result => console.log(result)); /* [
    { requested: './local', resolved: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/local.js'
      from: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/index.js' },
    { requested: './local-extra', resolved: null,
      from: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/index.js' },
    { requested: './folder', resolved: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/folder/index.js',
      from: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/index.js' },
    { requested: './folder-extra', resolved: null,
      from: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/index.js' },
    { requested: 'pkg', resolved: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/node_modules/pkg/index.js',
      from: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/index.js' },
    { requested: 'pkg-extra', resolved: null,
      from: '/Users/iamstarkov/projects/es-deps-resolved/fixtures/index.js' } ] */

esDepsResolved('./fixtures-unexistent')
  .then(result => console.log(result)); // null
```

## API

### esDepsResolved(filename)

If filename is resolvable, then it returns Promise which resolved to:
```js
Array[Object {
  requested: String,
  from: String,
  resolved: String | null
}]
```

Otherwise returns Promise, which resolved to `null`.

#### filename

*Required*  
Type: `String`

Relative path.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/es-deps-resolved
[npm-image]: https://img.shields.io/npm/v/es-deps-resolved.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/es-deps-resolved
[travis-image]: https://img.shields.io/travis/iamstarkov/es-deps-resolved.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/es-deps-resolved
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/es-deps-resolved.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/es-deps-resolved
[depstat-image]: https://david-dm.org/iamstarkov/es-deps-resolved.svg?style=flat-square
