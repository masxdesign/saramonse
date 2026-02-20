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
 *  href       — URL used on regular pages
 *  anchorHref — URL used on the homepage (anchor link, e.g. "#services")
 *  children   — optional array of sub-items; presence triggers a dropdown
 *
 * To add a menu item or sub-item, edit this file only.
 * The navigation template reads this data and renders everything automatically.
 */

export default {
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
