/* eslint-disable no-multi-spaces */
import test from 'ava';
import esDepsResolved from '../index';
import { join } from 'path';

const { cwd } = process;
const joinCwd = filename => join(cwd(), filename);

const assocFromJoinCwd = i => Object.assign({}, i, { from: joinCwd('fixtures/index.js') });

const expected = [
  { requested: './local',        resolved: joinCwd('fixtures/local.js') },
  { requested: './local-extra',  resolved: null },
  { requested: './folder',       resolved: joinCwd('fixtures/folder/index.js') },
  { requested: './folder-extra', resolved: null },
  { requested: 'pkg',            resolved: joinCwd('fixtures/node_modules/pkg/index.js') },
  { requested: 'pkg-extra',      resolved: null },
].map(assocFromJoinCwd);

console.log(expected);

test('should esDepsResolved', t => esDepsResolved('./fixtures')
  .then(_ => t.same(_, expected)));

test.skip('empty input', t => t.throws(esDepsResolved(), TypeError));
test.skip('invalid input', t => t.throws(esDepsResolved(2), TypeError));
