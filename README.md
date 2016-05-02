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

/* fixtures/index.js
import fileResolved from './local';
import fileUnresolved from './local-extra';

import folderResolved from './folder';
import folderUnresolved from './folder-extra';

import pkgResolved from 'pkg';
import pkgUnresolved from 'pkg-extra';
*/

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
  .catch(reason => console.error(reason)); // new Error("Can't find and open `./fixtures-unexistent`")
```

## API

### esDepsResolved(file)

Returns Promise which resolved to:
```js
Array[Object {
  requested: String,
  from: String,
  resolved: String | null /* `null` if dependency is not resolvable */
}]
```

#### file

*Required*  
Type: `String`

Relative path.

## Related

* [es-deps][es-deps] — ECMAScript 2015+/CommonJS module dependencies array
* [es-deps-from-string][es-deps-from-string] — ECMAScript 2015+/CommonJS module dependencies array from string
* [es-dep-unit][es-dep-unit] — Constructor for ECMAScript 2015+/CommonJS dependency unit `Object { requested, from, resolved }`
* [es-deps-deep][es-deps-deep] — ECMAScript 2015+/CommonJS module dependencies resolved in depth
* [es-dep-kit][es-dep-kit] — ECMAScript 2015+/CommonJS module dependencies helpers kit

[es-deps]: https://github.com/iamstarkov/es-deps
[es-deps-from-string]: https://github.com/iamstarkov/es-deps-from-string
[es-dep-unit]: https://github.com/iamstarkov/es-dep-unit
[es-deps-deep]: https://github.com/iamstarkov/es-deps-deep
[es-dep-kit]: https://github.com/iamstarkov/es-dep-kit

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
