const execPath = process.env.npm_execpath ?? '';

if (!execPath.includes('pnpm')) {
  console.error('This repository requires pnpm. Run `pnpm install` instead.');
  process.exit(1);
}
