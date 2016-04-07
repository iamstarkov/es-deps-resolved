import R from 'ramda';
import esDeps from 'es-deps';
import p from 'path';
import binded from 'binded';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import _resolveFrom from 'resolve-from';

const { resolve, reject } = binded(Promise);

const { log: _log } = binded(console);
const log = R.tap(_log);

const resolveFrom = R.curry(_resolveFrom);

// const
const id = R.identity;

// contract :: String -> Constructor -> a -> a | Promise.reject TypeError
const contract = R.curry((name, ctor, param) => R.unless(
  R.is(ctor),
  () => reject(
    new TypeError(`\`${name}\` should be \`${R.type(ctor())}\`, but got \`${R.type(param)}\``)
  )
)(param));

function esDepsResolved(filename) {
  return R.pipeP(resolve,
    contract('filename', String),
    resolveCwd,
    esDeps,
    R.map(R.pipe(
      R.of,
      // R.ap([id, resolveFrom(p.dirname(resolveCwd(filename)))]),
      R.zipObj(['requested', 'resolved']),
      // R.assoc('from', resolveCwd(filename)),
      id
    )),
    id
  )(filename);
}

export default esDepsResolved;
