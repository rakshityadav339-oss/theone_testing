import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BloomFilter,
  LruCache,
  RingBuffer,
  levenshtein,
  slugify,
  primesUpTo,
  mulberry32,
  summarizeText,
  extractKeywords,
  highlightTerms
} from '../src/index.js';

test('slugify', () => {
  assert.equal(slugify('  Hello, World!  '), 'hello-world');
});

test('levenshtein', () => {
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.equal(levenshtein('', 'abc'), 3);
});

test('BloomFilter basic', () => {
  const b = new BloomFilter(512, 4);
  b.add('alpha');
  b.add('beta');
  assert.equal(b.has('alpha'), true);
  assert.equal(b.has('beta'), true);
});

test('LruCache evicts', () => {
  const c = new LruCache<string, number>({ capacity: 2 });
  c.set('a', 1);
  c.set('b', 2);
  c.get('a');
  c.set('c', 3);
  assert.equal(c.has('b'), false);
  assert.equal(c.has('a'), true);
});

test('RingBuffer overwrites', () => {
  const r = new RingBuffer<number>(2);
  r.push(1);
  r.push(2);
  r.push(3);
  assert.deepEqual(r.toArray(), [2, 3]);
});

test('primesUpTo', () => {
  assert.deepEqual(primesUpTo(10), [2, 3, 5, 7]);
});

test('mulberry32 deterministic', () => {
  const a = mulberry32(123);
  const b = mulberry32(123);
  const seqA = [a.next(), a.next(), a.next()];
  const seqB = [b.next(), b.next(), b.next()];
  assert.deepEqual(seqA, seqB);
});

test('summarizeText + extractKeywords', () => {
  const s = 'The quick brown fox jumps over the lazy dog. The fox is quick!';
  const stats = summarizeText(s, 3);
  assert.equal(stats.sentences, 2);
  assert.equal(stats.words > 0, true);

  const kws = extractKeywords(s, { limit: 5 });
  assert.equal(kws.includes('fox'), true);
});

test('highlightTerms', () => {
  const s = 'Hello world';
  assert.equal(highlightTerms(s, ['world']), 'Hello **world**');
});
