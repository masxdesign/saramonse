import type { ServiceMenu } from './types';

export const eyesMenu: ServiceMenu = {
  serviceId: 'eyes',
  displayName: 'Eyes',
  pdfFileName: 'eyes-menu.pdf',
  blocks: [
    {
      type: 'simpleRow',
      title: 'Brow Shape',
      price: { kind: 'single', amount: '10' },
      description:
        'Define and refine your brows with our professional shaping service. Using a combination of threading, tweezing, and trimming to create a natural, flattering shape tailored to your face. (20mins)',
    },
    {
      type: 'simpleRow',
      title: 'Brow Wax',
      price: { kind: 'single', amount: '15' },
      description:
        'Define and refine your brows with our professional shaping service. Using a combination of waxing, tweezing, and trimming to create a natural, flattering shape tailored to your face. (25mins)',
    },
    {
      type: 'comingSoon',
      title: 'Eyelash Extensions / Brow Services',
      message: 'Coming Soon...',
    },
  ],
};
