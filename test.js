/* eslint-disable no-multi-spaces, no-underscore-dangle */
import test from 'ava';
import R from 'ramda';
import esDepsResolved from './index';
import { mock as depMock } from 'es-dep-unit';

const fixtureEntryDep = depMock(['fixtures'], R.__, 'index.js', R.__);

const expected = [
  fixtureEntryDep('./local',        'local.js'),
  fixtureEntryDep('./local-extra',  null),
  fixtureEntryDep('./folder',       'folder/index.js'),
  fixtureEntryDep('./folder-extra', null),
  fixtureEntryDep('pkg',            'node_modules/pkg/index.js'),
  fixtureEntryDep('pkg-extra',      null),
  fixtureEntryDep('path',           'path'),
];

test('basic', async t => {
  const result = await esDepsResolved('./fixtures');

  t.deepEqual(result[0], expected[0]);
  t.deepEqual(result[1], expected[1]);
  t.deepEqual(result[2], expected[2]);
  t.deepEqual(result[3], expected[3]);
  t.deepEqual(result[4], expected[4]);
  t.deepEqual(result[5], expected[5]);
  t.deepEqual(result[6], expected[6]);
});

test('unresolvable', t => t.throws(esDepsResolved('./fixtures-extra'), Error));
test('empty input', t => t.throws(esDepsResolved(), TypeError));
test('invalid input', t => t.throws(esDepsResolved(2), TypeError));
