/**
 * Navigation data — single source of truth for all menu items.
 *
 * Structure:
 *  left   — items rendered left of the centred logo (desktop)
 *  right  — items rendered right of the centred logo (desktop)
 *  icons  — icon-only links shown on the far right (desktop) and on mobile
 *
 * Per item:
 *  label       — display text
 *  href        — URL used on regular pages
 *  anchorHref  — URL used on the homepage (anchor link, e.g. "#services")
 *  children    — optional array of sub-items; presence triggers a dropdown
 *  parentLink  — (optional) set true to keep the parent label as a clickable
 *                link even when it has children; omit/false for a non-clickable
 *                label that only opens the dropdown (e.g. Services)
 *
 * To add a menu item or sub-item, edit this file only.
 * The navigation template reads this data and renders everything automatically.
 */

const nav = {
  left: [
    {
      label: "Home",
      href: "/",
      anchorHref: "#home"
    },
    {
      label: "Services",
      href: "/#services",
      anchorHref: "#services",
      children: [
        { label: "Facials", href: "/services/facials/" }
      ]
    }
  ],

  right: [
    {
      label: "Book Now",
      href: "/#book",
      anchorHref: "#book"
    },
    {
      label: "About Us",
      href: "/about",
      anchorHref: "#about"
    }
  ],

  icons: [
    { label: "Account", href: "#account", icon: "account" },
    { label: "Cart",    href: "#cart",    icon: "cart"    }
  ]
};

// Flat ordered list used by the mobile overlay — keeps the template loop simple
// and means animation-delay indices are computed here rather than hard-coded in CSS.
nav.mobileItems = [
  ...nav.left.flatMap(item => [
    { label: item.label, href: item.href, anchorHref: item.anchorHref, kind: "main" },
    ...(item.children || []).map(child => ({ label: child.label, href: child.href, kind: "child" }))
  ]),
  ...nav.right.map(item => ({ label: item.label, href: item.href, anchorHref: item.anchorHref, kind: "main" })),
  ...nav.icons
    .filter(icon => icon.icon !== "cart")
    .map(icon => ({ label: icon.label, href: icon.href, kind: "icon" }))
];

export default nav;
