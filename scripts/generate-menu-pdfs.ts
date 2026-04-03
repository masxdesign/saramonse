import { renderToFile } from '@react-pdf/renderer';
import React from 'react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allServiceMenus } from '../src/data/menus/index.ts';
import { MenuDocument } from '../src/pdf/MenuDocument.tsx';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

async function main() {
  for (const menu of allServiceMenus) {
    const outPath = path.join(root, 'public', 'assets', menu.pdfFileName);
    await renderToFile(React.createElement(MenuDocument, { menu }), outPath);
    console.log('Wrote', outPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
