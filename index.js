import R from 'ramda';
import esDeps from 'es-deps';
import { dirname } from 'path';
import binded from 'binded';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import resolveFrom from 'resolve-from';

const { resolve, reject } = binded(Promise);

const errorText = (name, ctor, param) => {
  const expected = R.type(ctor());
  const got = R.type(param);
  return `\`${name}\` should be \`${expected}\`, but got \`${got}\``;
};


// contract :: String -> Constructor -> a -> a | Promise.reject TypeError
const contract = R.curry((name, ctor, param) => R.unless(
  R.is(ctor), () => reject(new TypeError(errorText(name, ctor, param)))
)(param));

// relativeToRoot :: String -> (Function -> String -> String)
const relativeTo = R.pipe(resolveCwd, dirname, R.curry(resolveFrom));

// depToResolved :: String -> String -> Object
const depToResolved = R.curry((root, dep) => R.pipe(
  R.of,
  R.ap([R.identity, relativeTo(root)]),
  R.zipObj(['requested', 'resolved']),
  R.assoc('from', resolveCwd(root))
)(dep));

// esDepsResolved :: String -> Array[Object]
function esDepsResolved(filename) {
  return R.pipeP(resolve,
    contract('filename', String),
    resolveCwd,
    R.unless(R.isNil, R.pipeP(resolve,
      esDeps,
      R.map(depToResolved(filename))
    ))
  )(filename);
}

export default esDepsResolved;
