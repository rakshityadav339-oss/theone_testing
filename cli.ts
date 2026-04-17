import { createHash } from 'node:crypto';
import { BloomFilter } from './structures/bloomFilter.js';
import { wordWrap, slugify } from './strings/format.js';

function usage(): void {
  console.log(`theone-testing CLI\n\nCommands:\n  bloom-demo <text>\n  wrap <width> <text>\n  slug <text>\n`);
}

async function main(argv: string[]): Promise<void> {
  const [cmd, ...rest] = argv;
  if (!cmd) {
    usage();
    process.exitCode = 1;
    return;
  }

  if (cmd === 'bloom-demo') {
    const text = rest.join(' ').trim();
    const bloom = new BloomFilter(1024, 6);
    for (const token of text.split(/\s+/).filter(Boolean)) bloom.add(token);

    // Just to show off we can hash deterministically.
    const digest = createHash('sha256').update(text).digest('hex').slice(0, 12);
    console.log(`digest=${digest}`);
    console.log(`uniqueTokens≈${bloom.approximateCount()}`);
    console.log(`contains("the")=${bloom.has('the')}`);
    return;
  }

  if (cmd === 'wrap') {
    const width = Number(rest.shift());
    if (!Number.isFinite(width) || width <= 0) {
      console.error('width must be a positive number');
      process.exitCode = 2;
      return;
    }
    console.log(wordWrap(rest.join(' '), width));
    return;
  }

  if (cmd === 'slug') {
    console.log(slugify(rest.join(' ')));
    return;
  }

  usage();
  process.exitCode = 1;
}

await main(process.argv.slice(2));
