import test from 'ava';
import dep, { mock as depMock } from './index';
import { join } from 'path';

test('null', t => {
  const actual = dep(null, null, null);
  const expected = { from: null, requested: null, resolved: null };
  t.deepEqual(actual, expected);
});

test('requested', t => {
  const actual = dep('q', null, null).requested;
  const expected = 'q';
  t.deepEqual(actual, expected);
});

test('from', t => {
  const actual = dep(null, join(__dirname, './m.js'), null).from;
  const expected = join(__dirname, './m.js');
  t.deepEqual(actual, expected);
});

test('resolved', t => {
  const actual = dep(null, null, join(__dirname, './m.js')).resolved;
  const expected = join(__dirname, './m.js');
  t.deepEqual(actual, expected);
});

test('complicated shit', t => {
  const actual = dep(null, null, join(__dirname, './basic/first/second/index.js'));
  const expected = {
    requested: null,
    from: null,
    resolved: join(__dirname, './basic/first/second/index.js'),
  };
  t.deepEqual(actual, expected);
});

test('dont messup absolute paths', t => {
  const actual1 = dep(null, '/global/file.js', null).from;
  const actual2 = dep(null, null, '/global/file.js').resolved;
  const expected = '/global/file.js';
  t.deepEqual(actual1, expected);
  t.deepEqual(actual2, expected);
});

test('dont messup built-in modules', t => {
  const actual = dep('path', join(__dirname, 'index.js'), 'path');
  const expected = { requested: 'path', from: join(__dirname, 'index.js'), resolved: 'path' };
  t.deepEqual(actual, expected);
});

test('in path', t => {
  const actual = depMock(join('meow', 'purr'), null, null, './basic/first/second/index.js');
  const expected = {
    requested: null,
    from: null,
    resolved: join('meow', 'purr', './basic/first/second/index.js'),
  };
  t.deepEqual(actual, expected);
});

test('in path curried', t => {
  const actual = depMock(join('meow', 'purr'))(null, null, './basic/first/second/index.js');
  const expected = {
    requested: null,
    from: null,
    resolved: join('meow', 'purr', './basic/first/second/index.js'),
  };
  t.deepEqual(actual, expected);
});

test('invalid input', t => t.throws(() => { depMock(2, null, null, null); }, TypeError));
