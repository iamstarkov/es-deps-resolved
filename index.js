import R from 'ramda';
import esDeps from 'es-deps';
import p from 'path';
import binded from 'binded';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import _resolveFrom from 'resolve-from';

const { resolve } = binded(Promise);

const { log: _log } = binded(console);
const log = R.tap(_log);

const resolveFrom = R.curry(_resolveFrom);

// const
const id = R.identity;

function esDepsResolved(filename) {
  return R.pipeP(resolve,
    resolveCwd,
    esDeps,
    R.map(R.pipe(
      R.of,
      R.ap([id, resolveFrom(p.dirname(resolveCwd(filename)))]),
      R.zipObj(['requested', 'resolved']),
      R.merge({ from: resolveCwd(filename) }),
      log,
      id
    )),
    id
  )(filename);
}

export default esDepsResolved;
