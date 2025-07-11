import React, { useCallback, useState } from "react";
import { AsyncReducerState, useAsyncReducer } from "~/utils/useAsyncReducer";
import { browserClient } from "./api/client";
import { cookies } from "./cookies";

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  preferences: string[];
  loyaltyPoints: number;
  membershipStatus: string;
  bookings: string[];
  reviews: string[];
}

export type UseAuth = [
  AsyncReducerState<User> & {
    isLoginModalOpen: boolean;
  },
  {
    openLoginModal: () => void;
    closeLoginModal: () => void;
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleLogout: () => void;
    toggleLoginModal: () => void;
  },
];

export function useAuth(user: User | null): UseAuth {
  const [state, api] = useAsyncReducer<User>(
    !user
      ? undefined
      : {
          state: "done",
          data: user,
          error: null,
        },
  );

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const toggleLoginModal = useCallback(() => {
    setIsLoginModalOpen(prev => !prev);
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      api.start();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      try {
        const token = await browserClient.login(email, password);
        cookies.setAuthToken(token);
        const user = await browserClient.getUser(token.accessToken);
        closeLoginModal();
        api.done(user);
      } catch (error) {
        console.error(error);
        api.error(error as Error);
      }
    },
    [closeLoginModal, api],
  );

  const handleLogout = useCallback(async () => {
    api.start();
    try {
      const token = cookies.getAuthToken();
      if (!token) return api.error(new Error("could not logout"));
      await browserClient.logout(token.accessToken);
      cookies.removeAuthToken();
      api.reset();
    } catch (error) {
      console.error(error);
      api.error(error as Error);
    }
  }, [api]);

  return [
    {
      ...state,
      isLoginModalOpen,
    },
    {
      openLoginModal,
      closeLoginModal,
      handleLogin,
      handleLogout,
      toggleLoginModal,
    },
  ];
}
