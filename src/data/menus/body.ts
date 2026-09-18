import type { ServiceMenu } from './types';

export const bodyMenu: ServiceMenu = {
  serviceId: 'body',
  displayName: 'Body',
  pdfFileName: 'body-menu.pdf',
  blocks: [
    {
      type: 'slotRow',
      title: 'Relaxing Massage',
      slots: [
        { label: '30mins', amount: '40' },
        { label: '60mins', amount: '70' },
      ],
      description:
        'Unwind with our full-body Relaxing Massage, designed to release tension, reduce stress, and restore a sense of calm. Using gentle, flowing techniques, this treatment soothes muscles and promotes deep relaxation for body and mind.',
    },
    {
      type: 'slotRow',
      title: 'Lymphatic Drainage Massage',
      slots: [
        { label: '30mins', amount: '45' },
        { label: '60mins', amount: '75' },
      ],
      description:
        'A specialised massage that encourages the natural drainage of the lymph, helping to reduce swelling, improve circulation, and detoxify the body. Ideal for clients experiencing fluid retention, sluggish circulation, or those recovering post-treatment.',
    },
    {
      type: 'simpleRow',
      title: 'Back, Neck, Shoulder Massage',
      price: { kind: 'single', amount: '39' },
      description:
        'Target tension in the areas that need it most. This focused massage relieves stiffness and stress in the back, neck, and shoulders - perfect for desk workers or anyone carrying daily tension in these common problem zones. (30mins)',
    },
    {
      type: 'simpleRow',
      title: 'Maderotherapy (Wood Therapy)',
      price: { kind: 'single', amount: '90' },
      description:
        'An advanced body-sculpting massage using specially crafted wooden tools to stimulate circulation, break down localised fat deposits, and improve skin tone. This natural technique helps contour the body, reduce cellulite, and leave skin looking firmer and smoother. (60mins)',
    },
    {
      type: 'simpleRow',
      title: 'Single Session Faradic Machine',
      price: { kind: 'single', amount: '40' },
      description:
        'Our Faradic treatment uses low-frequency electrical impulses to stimulate and contract muscles, mimicking the effect of exercise. This helps tone and firm targeted areas, improve muscle definition, and support inch-loss programs. A great option for clients wanting visible body contouring without strenuous workouts. (35mins)',
    },
    {
      type: 'simpleRow',
      title: 'Single Session Pressotherapy Machine',
      price: { kind: 'single', amount: '30' },
      description:
        'Pressotherapy is a relaxing, compression-based treatment that stimulates lymphatic drainage, reduces water retention, and boosts circulation. Ideal for clients with tired or heavy legs, fluid retention, or cellulite concerns, it leaves the body feeling lighter, detoxified, and refreshed. (35mins)',
    },
  ],
};
