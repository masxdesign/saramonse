/**
 * Single source of truth for service price menus (web + PDF).
 */

export type Price =
  | { kind: 'single'; amount: string }
  | { kind: 'from'; amount: string }
  | { kind: 'slots'; slots: { label: string; amount: string }[] };

export type RichContent =
  | { kind: 'p'; text: string }
  | { kind: 'h4'; text: string }
  | { kind: 'ul'; items: string[] };

export type ExtrasCell = {
  /** 'from' shows From £x; 'plain' shows £x only; 'dash' omits that column in the extras grid */
  mode: 'from' | 'plain' | 'dash';
  amount?: string;
};

export type MenuBlock =
  | { type: 'section'; title: string }
  | {
      type: 'simpleRow';
      title: string;
      price: Price;
      priceNote?: string;
      priceStyle?: 'default' | 'intro';
      description: string;
    }
  | {
      type: 'richRow';
      title: string;
      price: Price;
      body: RichContent[];
    }
  | {
      type: 'slotRow';
      title: string;
      slots: { label: string; amount: string }[];
      description: string;
    }
  | {
      type: 'fatDissolve';
      sectionTitle: string;
      intro: string;
      listHeading: string;
      rows: { bold: string; detail: string; fromAmount: string }[];
      footerNote: string;
    }
  | {
      type: 'comingSoon';
      title: string;
      message: string;
    }
  | {
      type: 'extrasGrid';
      columnLabels: [string, string];
      rows: { name: string; hands: ExtrasCell; feet: ExtrasCell }[];
    }
  | {
      type: 'removalGroup';
      groupTitle: string;
      items: { label: string; amount: string }[];
    }
  | { type: 'prose'; variant: 'quote'; text: string };

export type ServiceMenu = {
  serviceId: string;
  displayName: string;
  pdfFileName: string;
  blocks: MenuBlock[];
};
