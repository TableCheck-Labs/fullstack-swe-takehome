import { UseAuth } from "~/services/useAuth";

interface Props {
  auth: UseAuth;
}

export function Auth({ auth: [state, api] }: Props) {
  if (!state.isLoginModalOpen) return null;

  if (state.isLoginModalOpen)
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
        <form className="bg-white rounded p-4 shadow-xl w-0full max-w-md overflow-hidden" onSubmit={api.handleLogin}>
          <h2 className="text-2xl font-bold mb-2">login</h2>
          <input className="border rounded px-3 py-2 w-full mb-4" type="text" placeholder="email" />
          <input className="border rounded px-3 py-2 w-full mb-4" type="password" placeholder="password" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">
            login
          </button>
        </form>
      </div>
    );
}
