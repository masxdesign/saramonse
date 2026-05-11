import type { MenuBlock, ServiceMenu } from './types';

export const nailsHandsBlocks: MenuBlock[] = [
  {
    type: 'richRow',
    title: 'Signature BIAB / Builder Gel Manicure',
    price: { kind: 'single', amount: '45' },
    body: [
      {
        kind: 'p',
        text:
          'Nails are shaped, buffed and cuticles perfected before builder gel is applied to strengthen and protect the natural nail.',
      },
      { kind: 'p', text: 'Finished in your choice of BIAB shade or gel colour.' },
    ],
  },
  {
    type: 'richRow',
    title: 'BIAB / Builder Gel Infill',
    price: { kind: 'single', amount: '38' },
    body: [
      {
        kind: 'p',
        text:
          'Maintenance treatment including rebalance, infill and cuticle refinement to keep nails strong, neat and consistent.',
      },
      { kind: 'p', text: 'Recommended every 2–3 weeks.' },
      { kind: 'p', text: 'Please note: This service is for existing BIAB applied by Monse Studio.' },
      {
        kind: 'p',
        text:
          'If you have builder gel applied elsewhere or are unsure, please book a removal and new set.',
      },
    ],
  },
  {
    type: 'richRow',
    title: 'Signature Manicure - Gel',
    price: { kind: 'single', amount: '35' },
    body: [
      { kind: 'p', text: 'Expert shaping, cuticle care and a high-gloss gel finish.' },
      {
        kind: 'p',
        text: 'Designed for long-lasting, chip-resistant wear with a flawless result.',
      },
    ],
  },
  {
    type: 'richRow',
    title: 'Soft Gel Extensions - New Set',
    price: { kind: 'single', amount: '50' },
    body: [
      {
        kind: 'p',
        text:
          'Lightweight full-cover extensions using The GelBottle system, customised to your preferred shape and short to medium length. A less damaging alternative to acrylics.',
      },
      {
        kind: 'p',
        text:
          'Finished with a clean, high-gloss gel colour for a refined, long-lasting result.',
      },
      {
        kind: 'p',
        text: 'Designed for a natural, comfortable and durable finish.',
      },
    ],
  },
  {
    type: 'richRow',
    title: 'Soft Gel Extensions - Removal & New Set',
    price: { kind: 'single', amount: '55' },
    body: [
      {
        kind: 'p',
        text:
          'Safe removal of existing soft gel extensions originally applied by Monse Studio, followed by a fresh full set using The GelBottle system. A less damaging alternative to acrylics.',
      },
      {
        kind: 'p',
        text:
          'For best results, extensions are removed and reapplied each appointment to maintain a clean, consistent and long-lasting finish.',
      },
      { kind: 'p', text: '*** Only short to medium lengths offered ***' },
      { kind: 'p', text: 'Please note: This service is for existing clients' },
    ],
  },
  {
    type: 'richRow',
    title: 'Signature Manicure - Polish',
    price: { kind: 'single', amount: '28' },
    body: [
      {
        kind: 'p',
        text:
          'A refined manicure including expert shaping, cuticle care and a classic polish finish.',
      },
      { kind: 'p', text: 'Clean, well-groomed nails with a natural shine.' },
      { kind: 'p', text: '(Our 7 day guarantee does not apply to this service).' },
    ],
  },
  {
    type: 'richRow',
    title: 'Express Manicure - Polish',
    price: { kind: 'single', amount: '12' },
    body: [
      {
        kind: 'p',
        text: 'A quick tidy including nail shaping and classic polish application.',
      },
      { kind: 'p', text: 'Perfect for a simple refresh.' },
      { kind: 'p', text: '(Our 7 day guarantee does not apply to this service).' },
    ],
  },
];

/** Hands add-ons: compact table (same pattern as former Extras grid). */
export const nailsAddOnHandsGridBlock: MenuBlock = {
  type: 'extrasGrid',
  title: 'Add on hands',
  singleColumn: true,
  columnLabels: ['', ''],
  rows: [
    {
      name: 'Nail Repair (Natural Nail)',
      hands: { mode: 'plain', amount: '3' },
      feet: { mode: 'dash' },
    },
    {
      name: 'Nail Repair (Extension)',
      hands: { mode: 'plain', amount: '5' },
      feet: { mode: 'dash' },
    },
    {
      name: 'French Design',
      hands: { mode: 'plain', amount: '5' },
      feet: { mode: 'dash' },
    },
    {
      name: 'Hydrating Hand Treatment',
      hands: { mode: 'plain', amount: '5' },
      feet: { mode: 'dash' },
    },
    {
      name: 'Removal (Applied by Monse Studio)',
      hands: { mode: 'plain', amount: '5' },
      feet: { mode: 'dash' },
    },
    {
      name: 'Removal (Other Technicians Work)',
      hands: { mode: 'plain', amount: '12' },
      feet: { mode: 'dash' },
    },
  ],
};

/** Hands treatments + add-on grid (single Hands section on web/PDF). */
export const nailsHandsSectionBlocks: MenuBlock[] = [...nailsHandsBlocks, nailsAddOnHandsGridBlock];

export const nailsFeetBlocks: MenuBlock[] = [
  {
    type: 'richRow',
    title: 'Gel Pedicure',
    price: { kind: 'single', amount: '38' },
    body: [
      {
        kind: 'p',
        text:
          'A complete pedicure including expert shaping, cuticle care and a high-gloss gel finish. Leaves feet looking neat, refreshed and perfectly maintained.',
      },
      { kind: 'p', text: '(Dry Pedicure)' },
    ],
  },
  {
    type: 'richRow',
    title: 'Signature Gel Pedicure',
    price: { kind: 'single', amount: '45' },
    body: [
      {
        kind: 'p',
        text:
          'A complete pedicure including shaping, cuticle care and gel polish, enhanced with steam, exfoliation and a relaxing massage.',
      },
      { kind: 'p', text: 'Designed to soften, smooth and restore the skin.' },
    ],
  },
  {
    type: 'richRow',
    title: 'File, Cuticle & Polish - Toes',
    price: { kind: 'single', amount: '25' },
    body: [
      {
        kind: 'p',
        text:
          'Nails are shaped, cuticles refined and finished with your chosen polish. Leaves toes looking clean, neat and well-groomed.',
      },
      { kind: 'p', text: '(Dry Pedicure)' },
      { kind: 'p', text: '***Pedicure treatment upgrade available***' },
    ],
  },
  {
    type: 'richRow',
    title: 'Signature Polish Pedicure',
    price: { kind: 'single', amount: '35' },
    body: [
      {
        kind: 'p',
        text:
          'A complete pedicure including shaping, cuticle care and polish, enhanced with steam, exfoliation and a relaxing massage.',
      },
      { kind: 'p', text: 'Leaves feet soft, smooth and well-maintained.' },
    ],
  },
  {
    type: 'richRow',
    title: 'Gel Toe - File & Colour',
    price: { kind: 'single', amount: '30' },
    body: [
      {
        kind: 'p',
        text:
          'Nails are shaped and finished with a high-gloss gel colour for long-lasting wear. Perfect for a clean, polished look.',
      },
      {
        kind: 'p',
        text: '(Due to speedy nature of treatment the 7 day guarantee does not apply).',
      },
    ],
  },
  {
    type: 'richRow',
    title: 'Polish Toes - File & Colour',
    price: { kind: 'single', amount: '15' },
    body: [
      {
        kind: 'p',
        text: 'Nails are expertly shaped and finished with your chosen polish.',
      },
      { kind: 'p', text: 'A simple, clean refresh for natural toes.' },
    ],
  },
];

/** Feet add-ons: compact table + footer note (same pattern as Add on hands). */
export const nailsAddOnFeetGridBlock: MenuBlock = {
  type: 'extrasGrid',
  title: 'Add on feet',
  singleColumn: true,
  columnLabels: ['', ''],
  footerNote:
    'Please note: If you would like nail art, kindly email your design inspiration prior to your appointment. Alternatively, you can choose from our curated lookbook.',
  rows: [
    {
      name: 'Chrome / Glazed Finish',
      hands: { mode: 'plain', amount: '5' },
      feet: { mode: 'dash' },
    },
    {
      name: 'Minimal Nail Art',
      hands: { mode: 'literal', text: '£3 – £10' },
      feet: { mode: 'dash' },
    },
    {
      name: 'Signature Nail Art',
      hands: { mode: 'literal', text: '£10 – £15' },
      feet: { mode: 'dash' },
    },
  ],
};

/** Feet treatments + add-on grid (single Feet section on web/PDF). */
export const nailsFeetSectionBlocks: MenuBlock[] = [...nailsFeetBlocks, nailsAddOnFeetGridBlock];

export const nailsRemovalBlocks: MenuBlock[] = [
  {
    type: 'removalGroup',
    groupTitle: 'Gel Polish Removal',
    intro: [
      {
        kind: 'p',
        text:
          'Safe and gentle removal of gel polish, leaving nails clean and ready for your next service.',
      },
      {
        kind: 'p',
        text: 'Pricing varies depending on previous application.',
      },
    ],
    items: [
      { label: 'Applied by Monse Studio.', amount: '5' },
      { label: 'Applied by another technician', amount: '12' },
    ],
  },
  {
    type: 'removalGroup',
    groupTitle: 'BIAB / Builder Gel Removal',
    intro: [
      {
        kind: 'p',
        text:
          'Professional removal of builder gel or BIAB, carefully refined to protect the natural nail.',
      },
      {
        kind: 'p',
        text: 'Pricing varies depending on previous application.',
      },
    ],
    items: [
      { label: 'Applied by Monse Studio.', amount: '5' },
      { label: 'Applied by another technician', amount: '12' },
    ],
  },
  {
    type: 'richRow',
    title: 'Hard Gel / Acrylic / Gel X Removal',
    price: { kind: 'single', amount: '20' },
    body: [
      {
        kind: 'p',
        text:
          'Safe removal of Hard Gel, Acrylic, Gel X enhancements applied by another technician.',
      },
      {
        kind: 'p',
        text: 'This service requires additional time and care to protect the natural nail.',
      },
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
    ...nailsHandsSectionBlocks,
    { type: 'section', title: 'Feet' },
    ...nailsFeetSectionBlocks,
    { type: 'section', title: 'Removal' },
    ...nailsRemovalBlocks,
    { type: 'section', title: 'Nail Art' },
    ...nailsNailArtBlocks,
  ],
};
