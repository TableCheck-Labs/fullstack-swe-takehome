import { User } from "lucide-react";
import { UseAuth } from "~/services/useAuth";
import { UseMenu } from "~/services/useMenu";

interface Props {
  auth: UseAuth;
  menu: UseMenu;
}

export function NavBarContent({ auth: [state, authApi], menu: [menu, menuApi] }: Props) {
  return (
    <div className="fixed top-0 right-0 h-screen w-2/5 bg-white shadow-lg z-50 transform transition-transform duration-300">
      <div className="p-6 space-y-4">
        {state.data && (
          <h3 className="text-lg flex flex-row items-center font-semibold">
            <User className="w-4 h-4 mr-2" />
            <span className="text-gray-500">{state.data.email}</span>
          </h3>
        )}
        <ul className="space-y-2">
          <li>
            <a href="#" onClick={menuApi.closeMenu} className="text-blue-600 hover:underline">
              {`< close`}
            </a>
          </li>
          <li>
            <button
              className="flex items-center"
              onClick={() => {
                if (state.data) {
                  authApi.handleLogout();
                  menuApi.closeMenu();
                } else {
                  authApi.openLoginModal();
                  menuApi.closeMenu();
                }
              }}
            >
              {state.data ? "logout" : "login"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
