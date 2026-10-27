/**
 * Navigation config. Only routes that exist are listed, so no link is a dead end.
 * Add entries here as each phase ships its page.
 */
export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];
