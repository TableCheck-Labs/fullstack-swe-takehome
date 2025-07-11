import { Menu } from "lucide-react";
import { UseMenu } from "~/services/useMenu";

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  menu: UseMenu;
}

export function NavBar({ title, children, menu: [menu, menuApi] }: Props) {
  return (
    <div className="bg-slate-400 w-screen">
      <header className="flex justify-between items-center p-4">
        {title}
        <Menu className="cursor-pointer" onClick={menuApi.toggleMenu} />
        {menu.isMenuOpen && children}
      </header>
    </div>
  );
}
