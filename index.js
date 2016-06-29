import R from 'ramda';
import esDeps from 'es-deps';
import { dirname } from 'path';
import Promise from 'pinkie-promise';
import resolveFrom from 'resolve-from';
import contract from 'neat-contract';
import depUnit from 'es-dep-unit';


// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);


// relativeTo :: String -> (Function -> String -> String)
const relativeTo = R.pipe(
  require.resolve,
  dirname,
  R.curry(resolveFrom)
);


// depToResolved :: String -> String -> Object
const depToResolved = R.curry((root, dep) => R.pipe(
  R.of,
  R.ap([
    R.identity,
    R.always(require.resolve(root)),
    relativeTo(root),
  ]),
  R.apply(depUnit)
)(dep));


// esDepsResolved :: String -> [Object]
function esDepsResolved(file) {
  return R.pipeP(toPromise,
    contract('file', String),
    require.resolve,
    esDeps,
    R.map(depToResolved(file))
  )(file);
}

export default esDepsResolved;
