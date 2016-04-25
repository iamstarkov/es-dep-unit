import test from 'ava';
import { esDepUnit, esDepUnitAsync } from './index';

test('basic', t =>
  t.is(esDepUnit('unicorns'), 'unicorns'));

test('empty input', t => t.throws(() => { esDepUnit(); }, TypeError));
test('invalid input', t => t.throws(() => { esDepUnit(2); }, TypeError));

test('async :: basic', async t => t.is(
  await esDepUnitAsync('unicorns'),
  'unicorns'));

test('async :: empty input', t => t.throws(esDepUnitAsync(), TypeError));
test('async :: invalid input', t => t.throws(esDepUnitAsync(2), TypeError));
