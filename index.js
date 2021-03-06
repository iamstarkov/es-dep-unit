/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import { join } from 'path';
import pathIsAbsolute from 'path-is-absolute';
import isBuiltinModule from 'is-builtin-module';
import contract from 'neat-contract';

// joinNullCwd :: Array[String] -> String|null -> String|null
const joinNullCwd = (inPathArray, file) => R.cond([
  [R.isNil, R.identity],
  [isBuiltinModule, R.identity],
  [pathIsAbsolute, R.identity],
  [R.is(String), R.pipe(R.concat(inPathArray), R.prepend(process.cwd()), R.apply(join))],
  [R.T, R.always(null)],
])(file);

// esDepUnitMock :: Array[String] -> String|null -> String|null -> String|null -> Object
const esDepUnitMock = R.curry((inPathArray, requested, from, resolved) => {
  contract('inPathArray', Array, inPathArray);
  return { requested,
    from: joinNullCwd(inPathArray, from),
    resolved: joinNullCwd(inPathArray, resolved) };
});

// esDepUnitMock :: String|null -> String|null -> String|null -> Object
const esDepUnit = esDepUnitMock([]);

esDepUnit.mock = esDepUnitMock;
export default esDepUnit;
