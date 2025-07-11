import { useMemo, useState } from "react";

export type UseMenu = [
  {
    isMenuOpen: boolean;
  },
  {
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
  },
];

export function useMenu(): UseMenu {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const api: UseMenu = useMemo(
    () => [
      {
        isMenuOpen,
      },
      {
        openMenu: () => setIsMenuOpen(true),
        closeMenu: () => setIsMenuOpen(false),
        toggleMenu: () => setIsMenuOpen(prev => !prev),
      },
    ],
    [isMenuOpen],
  );

  return api;
}
