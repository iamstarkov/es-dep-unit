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

const { cwd } = process;

const joinNullCwd = (inPathArr, file) =>
  R.ifElse(
    R.is(String),
    R.unless(pathIsAbsolute, R.pipe(
      R.append(R.__, inPathArr),
      R.prepend(cwd()),
      R.apply(join)
    )),
    R.always(null))(file);

const dep = R.curry((inPathArr, requested, from, resolved) => {
  contract('inPathArr', Array, inPathArr);

  return { requested,
    from: joinNullCwd(inPathArr, from),
    resolved: joinNullCwd(inPathArr, resolved) };
});

export default dep;
