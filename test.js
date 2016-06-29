/* eslint-disable no-multi-spaces, no-underscore-dangle */
import test from 'ava';
import R from 'ramda';
import esDepsResolved from './index';
import { mock as depMock } from 'es-dep-unit';
import { join } from 'path';

const fixtureEntryDep = depMock(['fixtures'], R.__, 'index.js', R.__);

test('basic', async t => {
  const actual = await esDepsResolved(join(__dirname, './fixtures/index.js'));
  const expected = [
    fixtureEntryDep('./local',        'local.js'),
    fixtureEntryDep('./local-extra',  null),
    fixtureEntryDep('./folder',       'folder/index.js'),
    fixtureEntryDep('./folder-extra', null),
    fixtureEntryDep('pkg',            'node_modules/pkg/index.js'),
    fixtureEntryDep('pkg-extra',      null),
    fixtureEntryDep('path',           'path'),
  ];

  t.deepEqual(actual[0], expected[0]);
  t.deepEqual(actual[1], expected[1]);
  t.deepEqual(actual[2], expected[2]);
  t.deepEqual(actual[3], expected[3]);
  t.deepEqual(actual[4], expected[4]);
  t.deepEqual(actual[5], expected[5]);
  t.deepEqual(actual[6], expected[6]);
});

test('resolve', async t => {
  const actual = await esDepsResolved(join(__dirname, './fixtures'));
  const expected = 7;
  t.deepEqual(actual.length, expected);
});

test('unresolvable', t => t.throws(esDepsResolved(join(__dirname, './fixtures-extra')), Error));
test('empty input', t => t.throws(esDepsResolved(), TypeError));
test('invalid input', t => t.throws(esDepsResolved(2), TypeError));
