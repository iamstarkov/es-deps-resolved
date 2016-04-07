import R from 'ramda';
import esDeps from 'es-deps';
import { dirname } from 'path';
import binded from 'binded';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import resolveFrom from 'resolve-from';

const { resolve, reject } = binded(Promise);

// contract :: String -> Constructor -> a -> a | Promise.reject TypeError
const contract = R.curry((name, ctor, param) => R.unless(
  R.is(ctor),
  () => reject(
    new TypeError(`\`${name}\` should be \`${R.type(ctor())}\`, but got \`${R.type(param)}\``)
  )
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

function esDepsResolved(filename) {
  return R.pipeP(resolve,
    contract('filename', String),
    resolveCwd,
    esDeps,
    R.map(depToResolved(filename))
  )(filename);
}

export default esDepsResolved;
