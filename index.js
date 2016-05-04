import R from 'ramda';
import esDeps from 'es-deps';
import { dirname } from 'path';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import resolveFrom from 'resolve-from';
import contract from 'neat-contract';
import depUnit from 'es-dep-unit';

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// relativeToRoot :: String -> (Function -> String -> String)
const relativeTo = R.pipe(resolveCwd, dirname, R.curry(resolveFrom));

// depToResolved :: String -> String -> Object
const depToResolved = R.curry((root, dep) => R.pipe(
  R.of,
  R.ap([R.identity, R.always(resolveCwd(root)), relativeTo(root)]),
  R.apply(depUnit)
)(dep));

// esDepsResolved :: String -> Array[Object]
function esDepsResolved(file) {
  return R.pipeP(toPromise,
    contract('file', String),
    resolveCwd,
    R.when(R.isNil, () => { throw new Error(`Can't resolve file \`${file}\` `); }),
    esDeps,
    R.map(depToResolved(file))
  )(file);
}

export default esDepsResolved;
