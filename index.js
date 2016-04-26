import R from 'ramda';
import esDeps from 'es-deps';
import { dirname } from 'path';
import binded from 'binded';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import resolveFrom from 'resolve-from';
import contract from 'neat-contract';
import { esDepUnit } from 'es-dep-unit';

const { resolve, reject } = binded(Promise);

// relativeToRoot :: String -> (Function -> String -> String)
const relativeTo = R.pipe(resolveCwd, dirname, R.curry(resolveFrom));

// depToResolved :: String -> String -> Object
const depToResolved = R.curry((root, dep) => R.pipe(
  R.of,
  R.ap([R.identity, R.always(resolveCwd(root)), relativeTo(root)]),
  R.apply(esDepUnit)
)(dep));

// esDepsResolved :: String -> Array[Object]
function esDepsResolved(file) {
  return R.pipeP(resolve,
    contract('file', String),
    resolveCwd,
    R.when(R.isNil, () => reject(new Error(`Can't find and open \`${file}\``))),
    esDeps,
    R.map(depToResolved(file))
  )(file);
}

export default esDepsResolved;
