import test from 'ava';
import { esDepUnit, esDepUnitMock } from './index';

import { join } from 'path';
const { cwd } = process;

test('null', t => t.deepEqual(
  esDepUnit(null, null, null),
  { from: null, requested: null, resolved: null }
));

test('requested', t => t.deepEqual(
  esDepUnit('q', null, null).requested, 'q'
));

test('from', t => t.deepEqual(
  esDepUnit(null, './m.js', null).from,
  join(cwd(), './m.js')
));

test('resolved', t => t.deepEqual(
  esDepUnit(null, null, './m.js').resolved,
  join(cwd(), './m.js')
));

test('complicated shit', t => t.deepEqual(
  esDepUnit(null, null, './basic/first/second/index.js'),
  { requested: null,
    from: null,
    resolved: join(cwd(), './basic/first/second/index.js') }
));

test('dont messup absolute paths', t => {
  t.deepEqual(
    esDepUnit(null, '/global/file.js', null).from,
    '/global/file.js'
  );
  t.deepEqual(
    esDepUnit(null, null, '/global/file.js').resolved,
    '/global/file.js'
  );
});

test('in path', t => t.deepEqual(
  esDepUnitMock(['meow', 'purr'], null, null, './basic/first/second/index.js'),
  { requested: null,
    from: null,
    resolved: join(cwd(), 'meow', 'purr', './basic/first/second/index.js') }
  ));

test('in path curried', t => t.deepEqual(
  esDepUnitMock(['meow', 'purr'])(null, null, './basic/first/second/index.js'),
  { requested: null,
    from: null,
    resolved: join(cwd(), 'meow', 'purr', './basic/first/second/index.js') }
));
