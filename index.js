/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import { join } from 'path';
import pathIsAbsolute from 'path-is-absolute';

const errorText = (name, ctor, param) => {
  const expected = R.type(ctor());
  const got = R.type(param);
  return `\`${name}\` should be \`${expected}\`, but got \`${got}\``;
};

// contract :: String -> Constructor -> a
const contract = R.curry((name, ctor, param) => R.unless(
  R.is(ctor),
  () => { throw new TypeError(errorText(name, ctor, param)); }
)(param));

const joinNullCwd = (inPathArray, file) =>
  R.ifElse(R.is(String),
    R.unless(pathIsAbsolute, R.pipe(
      R.concat(inPathArray),
      R.prepend(process.cwd()),
      R.apply(join)
    )),
    R.always(null)
  )(file);

const esDepUnitMock = R.curry((inPathArray, requested, from, resolved) => {
  contract('inPathArray', Array, inPathArray);
  return { requested,
    from: joinNullCwd(inPathArray, from),
    resolved: joinNullCwd(inPathArray, resolved) };
});

const esDepUnit = esDepUnitMock([]);

export { esDepUnit, esDepUnitMock };
