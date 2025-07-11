import { useCallback, useMemo, useState } from "react";
import { browserClient } from "~/services/api";
import { AsyncReducerState, useAsyncReducer } from "~/utils/useAsyncReducer";

export interface MenuItem {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  minQty: number;
  maxQty: number;
}

export type UseReserveOrder = [
  AsyncReducerState<{
    reservationId: string;
    success: boolean;
  } | null> & {
    selectedItem: MenuItem | null;
  },
  {
    setSelectedItem: (item: MenuItem | null) => void;
    handleSubmit: (quantity: number) => Promise<void>;
  },
];

export function useReserveOrder() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [state, service] = useAsyncReducer<{
    reservationId: string;
    success: boolean;
  } | null>();

  const handleSubmit = useCallback(
    async (quantity: number) => {
      if (!selectedItem) return;

      service.start();
      try {
        const response = await browserClient.reserveMenuItem({
          id: selectedItem.id,
          quantity,
        });
        service.done(response);
        window.location.assign(`/en/booking/${response.reservationId}`);
      } catch (error: any) {
        service.error(error);
      }
    },
    [selectedItem, service],
  );

  const api: UseReserveOrder = useMemo(
    () => [
      { ...state, selectedItem },
      {
        setSelectedItem,
        handleSubmit,
      },
    ],
    [state, selectedItem, setSelectedItem, handleSubmit],
  );

  return api;
}
