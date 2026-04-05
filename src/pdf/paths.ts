import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pdfDir = path.dirname(fileURLToPath(import.meta.url));

/** Repo root (parent of `src/`). */
export const REPO_ROOT = path.join(pdfDir, '..', '..');

/** PNG logo used in nav/footer — absolute path for @react-pdf Image in Node. */
export const LOGO_PNG_PATH = path.join(REPO_ROOT, 'public', 'assets', 'logo_256.png');
