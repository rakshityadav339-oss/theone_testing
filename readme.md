# theone_testing

This repo contains a small TypeScript codebase (utilities + data structures) with a tiny CLI and unit tests.

## Quick start

```bash
npm install
npm run build
npm test
```

## CLI

```bash
npm run build
npm run start -- wrap 20 "some long sentence that should wrap"
npm run start -- slug "Hello, World!"
npm run start -- bloom-demo "the quick brown fox jumps over the lazy dog"
```

## What's inside

- `src/strings/*`: formatting helpers, similarity metrics, long-text utilities
- `src/structures/*`: Bloom filter, LRU cache, ring buffer
- `src/math/*`: primes, basic stats, deterministic RNG
- `test/*`: `node:test` coverage
test 1[]
