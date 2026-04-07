import type { ExtrasCell, Price } from '../../data/menus/types';

export function formatPounds(amount: string): string {
  return `£${amount}`;
}

export function priceDisplayParts(price: Price): {
  mode: 'single' | 'from' | 'slots';
  slots?: { label: string; amount: string }[];
  amount?: string;
} {
  if (price.kind === 'slots') {
    return { mode: 'slots', slots: price.slots };
  }
  if (price.kind === 'from') {
    return { mode: 'from', amount: price.amount };
  }
  return { mode: 'single', amount: price.amount };
}

/** Amount line for Extras grid (bold span); use with separate "From" label when mode is from. Dash columns are omitted in the grid. */
export function extrasAmountDisplay(cell: ExtrasCell): string {
  if (cell.mode === 'dash') return '';
  if (cell.amount) return `£${cell.amount}`;
  return '';
}
