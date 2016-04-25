# es-dep-unit

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Constructor for ECMAScript 2015+/CommonJS dependency unit `Object { requested, from, resolved }`

## Install

    npm install --save es-dep-unit

## Usage

```js
import { esDepUnit, esDepUnitMock } from 'es-dep-unit';

// if null nothing will happen
esDepUnit(null, null, null); // { requested: null, from: null, resolved: null }

// requested field is not processed anyhow
esDepUnit('./file.js', null, null); // { requested: './file.js', from: null, resolved: null }

// if `from` or `resolved` are absolute paths, they are not processed anyhow too
esDepUnit(null, '/global/file.js', null); // { requested: null, from: '/global/file.js', resolved: null }
esDepUnit(null, null, '/global/file.js'); // { requested: null, from: null, resolved: '/global/file.js' }

// if `from` or `resolved` are not absolute paths, they are prefixed with `process.cwd()`
esDepUnit(null, './file.js', null); // { requested: null, from: '/Users/iamstarkov/projects/es-dep-unit/file.js', resolved: null }
esDepUnit(null, null, './file.js'); // { requested: null, from: null, resolved: '/Users/iamstarkov/projects/es-dep-unit/file.js' }

esDepUnit('./file.js', './index.js', './file.js'); /* {
  requested: './file.js',
  from: '/Users/iamstarkov/projects/es-dep-unit/index.js',
  resolved: '/Users/iamstarkov/projects/es-dep-unit/file.js' } */


esDepUnitMock(['fixtures', 'testcase'], '')
```

## API

### esDepUnit(requested, from, resolved)

#### input

*Required*  
Type: `String` or `null`

Lorem ipsum.

#### options

##### foo

Type: `Boolean`  
Default: `false`

Lorem ipsum.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/es-dep-unit
[npm-image]: https://img.shields.io/npm/v/es-dep-unit.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/es-dep-unit
[travis-image]: https://img.shields.io/travis/iamstarkov/es-dep-unit.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/iamstarkov/es-dep-unit
[appveyor-image]: https://img.shields.io/appveyor/ci/iamstarkov/es-dep-unit.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/iamstarkov/es-dep-unit
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/es-dep-unit.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/es-dep-unit
[depstat-image]: https://david-dm.org/iamstarkov/es-dep-unit.svg?style=flat-square
