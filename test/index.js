/* eslint-disable no-multi-spaces, max-len */
import test from 'ava';
import esDepsResolved from '../index';
import { join } from 'path';
// import { deepEqual } from 'assert';

const { cwd } = process;
const joinCwd = filename => join(cwd(), 'fixtures', filename);

const expected = [
  { requested: './local',        from: joinCwd('index.js'), resolved: joinCwd('local.js') },
  { requested: './local-extra',  from: joinCwd('index.js'), resolved: null },
  { requested: './folder',       from: joinCwd('index.js'), resolved: joinCwd('folder/index.js') },
  { requested: './folder-extra', from: joinCwd('index.js'), resolved: null },
  { requested: 'pkg',            from: joinCwd('index.js'), resolved: joinCwd('node_modules/pkg/index.js') },
  { requested: 'pkg-extra',      from: joinCwd('index.js'), resolved: null },
];

test('should esDepsResolved', t => esDepsResolved('./fixtures')
  .then(_ => {
    t.deepEqual(_[0], expected[0]);
    t.deepEqual(_[1], expected[1]);
    t.deepEqual(_[2], expected[2]);
    t.deepEqual(_[3], expected[3]);
    t.deepEqual(_[4], expected[4]);
    t.deepEqual(_[5], expected[5]);
    // t.deepEqual(_, expected);
  }));

test.only('empty input', t => t.throws(esDepsResolved(), TypeError));
test.only('invalid input', t => t.throws(esDepsResolved(2), TypeError));
