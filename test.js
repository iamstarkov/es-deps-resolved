import test from 'ava';
import esDepsResolved from './index';

test('should esDepsResolved', (t) =>
  t.same(esDepsResolved('unicorns'), 'unicorns'));

test('should esDepsResolved invalid input', (t) =>
  t.same(esDepsResolved(), undefined));
