import type { MenuBlock, ServiceMenu } from './types';

export const nailsHandsBlocks: MenuBlock[] = [
  {
    type: 'simpleRow',
    title: 'File & Colour',
    price: { kind: 'single', amount: '12' },
    description:
      'A quick refresh for your nails! Shaping, buffing, and polish application for a neat finish. (25mins)',
  },
  {
    type: 'simpleRow',
    title: 'Full Manicure',
    price: { kind: 'single', amount: '28' },
    description:
      'Includes nail shaping, cuticle care, buffing, hydrating moisturiser, and polish for healthy, beautifully groomed nails. (50mins)',
  },
  {
    type: 'simpleRow',
    title: 'Gel Manicure',
    price: { kind: 'single', amount: '35' },
    description:
      'Nails are shaped and prepped before applying long-lasting gel polish that stays glossy and chip-free for up to 2 weeks. (60mins)',
  },
  {
    type: 'simpleRow',
    title: 'BIAB Manicure',
    price: { kind: 'single', amount: '45' },
    description:
      'Our BIAB (Builder in a Bottle) treatment strengthens natural nails with a flexible builder gel, finished with your choice of colour for a strong yet elegant look. (75mins)',
  },
  {
    type: 'simpleRow',
    title: 'BIAB Infill (Natural Nails)',
    price: { kind: 'single', amount: '38' },
    description:
      'Maintenance for BIAB nails. The builder gel is rebalanced and refreshed with colour so your nails stay strong and flawless. (60mins)',
  },
  {
    type: 'simpleRow',
    title: 'Gel Extensions - TGB Fullset',
    price: { kind: 'single', amount: '45' },
    priceNote: '*Intro Price',
    priceStyle: 'intro',
    description:
      'A complete enhancement service using The Gel Bottle (TGB) full form system to create beautifully pre-shaped nails with added length, strength, and a flawless finish. For Small to Medium length extensions. (120mins)',
  },
  {
    type: 'simpleRow',
    title: 'Gel Extensions - TGB Infill',
    price: { kind: 'single', amount: '38' },
    priceNote: '*Intro Price',
    priceStyle: 'intro',
    description:
      'Maintenance for your TGB full form extensions; the nails are rebalanced, reshaped, and finished with fresh colour to keep them strong, even, and looking perfect. (90mins)',
  },
];

export const nailsFeetBlocks: MenuBlock[] = [
  {
    type: 'simpleRow',
    title: 'File & Colour',
    price: { kind: 'single', amount: '15' },
    description:
      'A quick refresh for your toes! Shaping, buffing, and polish application for a neat finish. (30mins)',
  },
  {
    type: 'simpleRow',
    title: 'Full Pedicure',
    price: { kind: 'single', amount: '38' },
    description:
      'A complete foot treatment including soak, exfoliation, nail and cuticle care, buff, massage, and polish application; leaving your feet soft, refreshed, and beautifully finished. (60mins)',
  },
  {
    type: 'simpleRow',
    title: 'Gel Pedicure',
    price: { kind: 'single', amount: '46' },
    description:
      'All the benefits of our Full Pedicure, finished with long-lasting gel polish for glossy toes that stay flawless for weeks. Perfect for holidays or all-season shine. (75mins)',
  },
  {
    type: 'simpleRow',
    title: 'Gel Toes (Colour Only)',
    price: { kind: 'single', amount: '30' },
    description:
      'Quick and effective! Nails are shaped, cuticles prepped, and finished with chip-resistant gel polish for a neat, polished look that lasts. (40mins)',
  },
];

export const nailsExtrasBlocks: MenuBlock[] = [
  {
    type: 'extrasGrid',
    columnLabels: ['Hands', 'Feet'],
    rows: [
      { name: 'Nail Repair', hands: { mode: 'from', amount: '3' }, feet: { mode: 'from', amount: '4' } },
      { name: 'French Design', hands: { mode: 'plain', amount: '8' }, feet: { mode: 'plain', amount: '10' } },
      { name: 'Scrub + Hot Towel', hands: { mode: 'plain', amount: '10' }, feet: { mode: 'dash' } },
      { name: 'Mask + Hot Towel', hands: { mode: 'plain', amount: '12' }, feet: { mode: 'plain', amount: '14' } },
      { name: 'Massage (15mins)', hands: { mode: 'plain', amount: '12' }, feet: { mode: 'plain', amount: '15' } },
      { name: 'Nail Art (POC)', hands: { mode: 'from', amount: '5' }, feet: { mode: 'from', amount: '5' } },
    ],
  },
];

export const nailsRemovalBlocks: MenuBlock[] = [
  {
    type: 'removalGroup',
    groupTitle: 'Gel Polish - Take Off',
    items: [
      { label: 'Gel Polish Done by Us', amount: '5' },
      { label: 'Gel Polish Done Elsewhere', amount: '12' },
    ],
  },
  {
    type: 'removalGroup',
    groupTitle: 'BIAB Gel - Take Off',
    items: [
      { label: 'BIAB Done by Us', amount: '5' },
      { label: 'BIAB Done Elsewhere', amount: '12' },
    ],
  },
];

export const nailsNailArtQuote: MenuBlock = {
  type: 'prose',
  variant: 'quote',
  text:
    'Nail art is creative way to express your personality through colour, design and detail. From simple elegance to bold statements, it transforms your nails into tiny works of art.',
};

/** Left column on web grid; PDF stacks columns in order. */
export const nailsNailArtColLeft: MenuBlock[] = [
  {
    type: 'simpleRow',
    title: 'Chrome / Cat-Eye Effect (Fullset)',
    price: { kind: 'single', amount: '12' },
    description:
      "A layer of luxe, light-reflecting chrome. AKA the trending 'Glazed Donut' manicure, available in four stunning shades.",
  },
  {
    type: 'simpleRow',
    title: 'Feature Nail Art (one nail per hand)',
    price: { kind: 'single', amount: '10' },
    description: 'Touch of detail on one nail each hand. Marble, Floral, chrome accent.',
  },
  {
    type: 'simpleRow',
    title: 'Gems / Charms (per nail)',
    price: { kind: 'from', amount: '2' },
    description: 'Add sparkle or texture with rhinestones or mini charms, priced per gem & nail.',
  },
];

export const nailsNailArtColRight: MenuBlock[] = [
  {
    type: 'simpleRow',
    title: 'Bespoke (Fullset)',
    price: { kind: 'from', amount: '40' },
    description:
      "Custom hand-painted designs. Show a photo you've seen on social media, or we can discuss ideas together to create a personalised look.",
  },
  {
    type: 'simpleRow',
    title: 'NAIL ART - SM Collection',
    price: { kind: 'from', amount: '16' },
    description: 'Choose from my curated set of trendy, pre-approved designs for a stylish full look.',
  },
];

export const nailsNailArtBlocks: MenuBlock[] = [
  nailsNailArtQuote,
  ...nailsNailArtColLeft,
  ...nailsNailArtColRight,
];

export const nailsMenu: ServiceMenu = {
  serviceId: 'nails',
  displayName: 'Nails',
  pdfFileName: 'nails-menu.pdf',
  blocks: [
    { type: 'section', title: 'Hands' },
    ...nailsHandsBlocks,
    { type: 'section', title: 'Feet' },
    ...nailsFeetBlocks,
    { type: 'section', title: 'Extras' },
    ...nailsExtrasBlocks,
    { type: 'section', title: 'Removal' },
    ...nailsRemovalBlocks,
    { type: 'section', title: 'Nail Art' },
    ...nailsNailArtBlocks,
  ],
};
