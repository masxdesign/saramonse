import { bodyMenu } from './body';
import { eyesMenu } from './eyes';
import { facialsAddOnBlocks, facialsMainBlocks, facialsMenu } from './facials';
import { injectablesFatDissolveBlock, injectablesMenu, injectablesRestBlocks } from './injectables';
import {
  nailsExtrasBlocks,
  nailsFeetBlocks,
  nailsHandsBlocks,
  nailsMenu,
  nailsNailArtColLeft,
  nailsNailArtColRight,
  nailsNailArtQuote,
  nailsRemovalBlocks,
} from './nails';
import type { ServiceMenu } from './types';

export type { MenuBlock, Price, RichContent, ServiceMenu } from './types';

export {
  bodyMenu,
  eyesMenu,
  facialsAddOnBlocks,
  facialsMainBlocks,
  facialsMenu,
  injectablesFatDissolveBlock,
  injectablesMenu,
  injectablesRestBlocks,
  nailsExtrasBlocks,
  nailsFeetBlocks,
  nailsHandsBlocks,
  nailsMenu,
  nailsNailArtColLeft,
  nailsNailArtColRight,
  nailsNailArtQuote,
  nailsRemovalBlocks,
};

export const allServiceMenus: ServiceMenu[] = [
  facialsMenu,
  bodyMenu,
  eyesMenu,
  injectablesMenu,
  nailsMenu,
];
