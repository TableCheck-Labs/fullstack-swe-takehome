import { UseAuth } from "~/services/useAuth";

interface Props {
  title: React.ReactNode;
  auth: UseAuth;
}

export function NavBar({ title, auth: [state, authApi] }: Props) {
  let content = <div>error</div>;
  if (state.data) {
    content = (
      <button className="flex items-center" onClick={authApi.handleLogout}>
        logout
      </button>
    );
  } else {
    content = (
      <button className="flex items-center" onClick={authApi.openLoginModal}>
        login
      </button>
    );
  }

  return (
    <div className="bg-slate-400 w-screen">
      <header className="flex justify-between items-center p-4">
        {title}
        {content}
      </header>
    </div>
  );
}
