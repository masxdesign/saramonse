/**
 * Navigation data — single source of truth for all menu items.
 *
 * Structure:
 *  left   — items rendered left of the centred logo (desktop)
 *  right  — items rendered right of the centred logo (desktop)
 *  icons  — icon-only links shown on the far right (desktop) and on mobile
 *
 * Per item:
 *  label      — display text
 *  href       — URL (omit when the item has `children` and is not a `parentLink`;
 *               the label is then a non-navigating header for sub-links only)
 *  children   — optional array of sub-items; presence triggers a dropdown
 *  parentLink — (optional) set true to keep the parent label as a clickable
 *               link even when it has children; omit/false for a non-clickable
 *               label that only opens the dropdown (e.g. Services)
 *  disabled  — (optional) icon-only: show muted, no navigation; use with `tooltip`
 *  tooltip   — (optional) shown on hover/focus when `disabled` is true
 *
 * To add a menu item or sub-item, edit this file only.
 * The navigation template reads this data and renders everything automatically.
 */

import { FRESHA_BOOKING_URL, FRESHA_STORE_URL } from './site-urls.js';

const nav = {
  left: [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About Us",
      href: "/about"
    },
    {
      label: "Services",
      children: [
        { label: "Facials", href: "/services/facials/" },
        { label: "Body", href: "/services/body/" },
        { label: "Eyes", href: "/services/eyes/" },
        { label: "Nails", href: "/services/nails/" },
        { label: "Injectables", href: "/services/injectables/" },
      ],
    },
  ],

  right: [
    {
      label: "Book Now",
      href: FRESHA_BOOKING_URL,
      external: true,
    },
    {
      label: "Contact",
      href: "/contact/"
    },
    {
      label: "FAQ",
      href: "/faq/"
    }
  ],

  icons: [
    {
      label: "Account",
      href: "#account",
      icon: "account",
      disabled: true,
      tooltip:
        "Coming soon — your member sign-in for our in-house shop will live here. For now, you can browse our store on Fresha by clicking the basket icon beside this.",
    },
    { label: "Shop", href: FRESHA_STORE_URL, icon: "cart", external: true },
  ],
};

// Mobile overlay: scrollable links, then a bottom bar (CTA + Account). Book Now is excluded from the scroll list.
const rightWithoutCta = nav.right.filter((item) => item.label !== 'Book Now');
const bookNowItem = nav.right.find((item) => item.label === 'Book Now');
const accountItem = nav.icons.find((icon) => icon.icon === 'account');

nav.mobilePrimaryItems = [
  ...nav.left.flatMap((item) => {
    const childRows = (item.children || []).map((child) => ({
      label: child.label,
      href: child.href,
      kind: 'child',
    }));
    if (item.children?.length && !item.parentLink) {
      return [{ label: item.label, kind: 'parent' }, ...childRows];
    }
    return [{ label: item.label, href: item.href, kind: 'main' }, ...childRows];
  }),
  ...rightWithoutCta.map((item) => ({ label: item.label, href: item.href, kind: 'main' })),
];

nav.mobileOverlayFooter = [
  ...(bookNowItem ? [{ label: bookNowItem.label, href: bookNowItem.href, kind: 'cta' }] : []),
  ...(accountItem ? [{ label: accountItem.label, href: accountItem.href, kind: 'account' }] : []),
];

export default nav;
