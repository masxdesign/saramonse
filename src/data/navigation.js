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
 *  href       — URL
 *  children   — optional array of sub-items; presence triggers a dropdown
 *  parentLink — (optional) set true to keep the parent label as a clickable
 *               link even when it has children; omit/false for a non-clickable
 *               label that only opens the dropdown (e.g. Services)
 *
 * To add a menu item or sub-item, edit this file only.
 * The navigation template reads this data and renders everything automatically.
 */

const nav = {
  left: [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Services",
      href: "/#services",
      children: [
        { label: "Facials", href: "/services/facials/" }
      ]
    }
  ],

  right: [
    {
      label: "Book Now",
      href: "/#book"
    },
    {
      label: "About Us",
      href: "/about"
    }
  ],

  icons: [
    { label: "Account", href: "#account", icon: "account" },
    { label: "Cart",    href: "#cart",    icon: "cart"    }
  ]
};

// Mobile overlay: scrollable links, then a bottom bar (CTA + Account). Book Now is matched by href `/#book`.
const rightWithoutCta = nav.right.filter((item) => item.href !== '/#book');
const bookNowItem = nav.right.find((item) => item.href === '/#book');
const accountItem = nav.icons.find((icon) => icon.icon === 'account');

nav.mobilePrimaryItems = [
  ...nav.left.flatMap((item) => [
    { label: item.label, href: item.href, kind: 'main' },
    ...(item.children || []).map((child) => ({ label: child.label, href: child.href, kind: 'child' })),
  ]),
  ...rightWithoutCta.map((item) => ({ label: item.label, href: item.href, kind: 'main' })),
];

nav.mobileOverlayFooter = [
  ...(bookNowItem ? [{ label: bookNowItem.label, href: bookNowItem.href, kind: 'cta' }] : []),
  ...(accountItem ? [{ label: accountItem.label, href: accountItem.href, kind: 'account' }] : []),
];

export default nav;
