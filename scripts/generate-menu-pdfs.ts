import { renderToFile } from '@react-pdf/renderer';
import React from 'react';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { allServiceMenus } from '../src/data/menus/index.ts';
import {
  AllServicesMenuDocument,
  MenuDocument,
  type TocEntry,
} from '../src/pdf/MenuDocument.tsx';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

async function pdfPageCount(filePath: string): Promise<number> {
  const bytes = await readFile(filePath);
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
}

async function main() {
  for (const menu of allServiceMenus) {
    const outPath = path.join(root, 'public', 'assets', menu.pdfFileName);
    await renderToFile(React.createElement(MenuDocument, { menu }), outPath);
    console.log('Wrote', outPath);
  }

  /** Combined doc: p1 master cover, p2 TOC, p3+ same sequence as per-service PDFs. */
  let nextServiceCoverPage = 3;
  const tocEntries: TocEntry[] = [];
  for (const menu of allServiceMenus) {
    tocEntries.push({ name: menu.displayName, page: nextServiceCoverPage });
    const singlePath = path.join(root, 'public', 'assets', menu.pdfFileName);
    nextServiceCoverPage += await pdfPageCount(singlePath);
  }

  const combinedPath = path.join(root, 'public', 'assets', 'all-services-menu.pdf');
  await renderToFile(
    React.createElement(AllServicesMenuDocument, { menus: allServiceMenus, tocEntries }),
    combinedPath,
  );
  console.log('Wrote', combinedPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
