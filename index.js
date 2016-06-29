/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import { join } from 'path';
import pathIsAbsolute from 'path-is-absolute';
import isBuiltinModule from 'is-builtin-module';
import contract from 'neat-contract';


// processProp :: [String] -> (String|null -> String|null)
const processProp = R.memoize(prePath => R.cond([
  [R.isNil, R.identity],
  [isBuiltinModule, R.identity],
  [pathIsAbsolute, R.identity],
  [R.is(String), R.partial(join, [prePath])],
  [R.T, R.always(null)],
]));


// esDepUnitMock :: String -> String|null -> String|null -> String|null -> Object
function esDepUnitMock(prePath, requested, from, resolved) {
  contract('prePath', String, prePath);
  const transformations = {
    requested: R.identity,
    from: processProp(prePath),
    resolved: processProp(prePath),
  };
  return R.evolve(transformations, { requested, from, resolved });
}


// esDepUnit :: String|null -> String|null -> String|null -> Object
const esDepUnit = R.partial(esDepUnitMock, ['']);

esDepUnit.mock = R.curry(esDepUnitMock);

export default esDepUnit;
