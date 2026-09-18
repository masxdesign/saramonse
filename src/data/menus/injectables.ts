import type { MenuBlock, ServiceMenu } from './types';

export const injectablesFatDissolveBlock = {
  type: 'fatDissolve',
  sectionTitle: 'Fat Dissolve Injections',
  intro:
    "Our Fat Dissolve Injections target stubborn pockets of fat that don't shift with diet or exercise. Using a safe, effective solution, the treatment breaks down fat cells which are then naturally eliminated by the body.",
  listHeading: 'We Offer Treatments for:',
  rows: [
    { bold: 'Cheeks', detail: 'to slim and contour the face', fromAmount: '150' },
    { bold: 'Chin', detail: 'to reduce the appearance of a double chin', fromAmount: '150' },
    { bold: 'Abdomen', detail: 'to smooth and flatten the tummy area', fromAmount: '180' },
  ],
  footerNote: '(Results are gradual, with best outcomes achieved over a course of sessions.)',
} as const satisfies MenuBlock;

export const injectablesRestBlocks: MenuBlock[] = [
  {
    type: 'simpleRow',
    title: 'Vitamin B12',
    price: { kind: 'single', amount: '27' },
    description:
      'Boost your energy, focus, and overall wellbeing with a quick Vitamin B12 injection. This essential nutrient supports the immune system, reduces fatigue, and helps improve mood and metabolism. (20mins)',
  },
  {
    type: 'simpleRow',
    title: 'Profhilo (Skin Boosters)',
    price: { kind: 'single', amount: '200' },
    description:
      'An injectable skin booster containing high concentrations of hyaluronic acid. Profhilo® works beneath the skin to hydrate, improve elasticity, and stimulate collagen and elastin, leaving skin firmer, smoother, and more radiant. (45mins)',
  },
];

export const injectablesMenu: ServiceMenu = {
  serviceId: 'injectables',
  displayName: 'Injectables',
  pdfFileName: 'injectables-menu.pdf',
  blocks: [injectablesFatDissolveBlock, ...injectablesRestBlocks],
};
