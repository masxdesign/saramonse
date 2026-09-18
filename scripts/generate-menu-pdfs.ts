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

/**
 * Page count for the combined-menu TOC. Prefer pdf-lib; fall back to counting `/Type /Page` in the file
 * because @react-pdf/renderer output can trip pdf-lib's parser on some files (MissingPDFHeaderError deep in the stream).
 */
async function pdfPageCount(filePath: string): Promise<number> {
  const bytes = await readFile(filePath);
  try {
    const doc = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
      throwOnInvalidObject: false,
    });
    return doc.getPageCount();
  } catch (firstErr) {
    const latin1 = bytes.toString('latin1');
    const matches = latin1.match(/\/Type\s*\/Page\b/g);
    const n = matches?.length ?? 0;
    if (n < 1) {
      throw new Error(
        `Cannot count pages for ${filePath}: pdf-lib failed (${(firstErr as Error).message}) and regex fallback found 0 pages`,
      );
    }
    console.warn(
      `pdf-lib could not parse ${path.basename(filePath)}; using regex page count (${n}). Cause: ${(firstErr as Error).message}`,
    );
    return n;
  }
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
