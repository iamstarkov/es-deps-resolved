/* eslint-disable no-multi-spaces, max-len */
import test from 'ava';
import esDepsResolved from './index';
import { join } from 'path';

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

test('basic', async t => {
  const result = await esDepsResolved('./fixtures');

  t.deepEqual(result[0], expected[0]);
  t.deepEqual(result[1], expected[1]);
  t.deepEqual(result[2], expected[2]);
  t.deepEqual(result[3], expected[3]);
  t.deepEqual(result[4], expected[4]);
  t.deepEqual(result[5], expected[5]);
});

test('unresolvable', t => t.throws(esDepsResolved('./fixtures-extra'), Error));
test('empty input', t => t.throws(esDepsResolved(), TypeError));
test('invalid input', t => t.throws(esDepsResolved(2), TypeError));
