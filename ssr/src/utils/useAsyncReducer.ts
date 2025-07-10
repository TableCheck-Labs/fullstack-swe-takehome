import * as React from "react";

type Action<TData> =
  | { type: "start"; payload: null }
  | { type: "done"; payload: TData }
  | { type: "error"; payload: Error }
  | { type: "reset"; payload: null };

type State<TData> =
  | { state: "idle"; error: null; data: null }
  | { state: "loading"; error: null; data: null }
  | { state: "done"; error: null; data: TData }
  | { state: "error"; error: Error; data: null };

export type UseAsyncReducer<TResponse> = [
  {
    isLoading: boolean;
    isDone: boolean;
    isError: boolean;
    error: Error | null;
    data: TResponse | null;
  },
  {
    start: () => void;
    done: (data: TResponse) => void;
    error: (error: Error) => void;
    reset: () => void;
  },
];

export function useAsyncReducer<TResponse>(initialState?: State<TResponse>): UseAsyncReducer<TResponse> {
  const [store, dispatch] = React.useReducer<React.Reducer<State<TResponse>, Action<TResponse>>>(
    (s: State<TResponse>, action: Action<TResponse>) => {
      switch (action.type) {
        case "start":
          return { state: "loading", error: null, data: null };
        case "done":
          return { state: "done", error: null, data: action.payload };
        case "error":
          return { state: "error", error: action.payload, data: null };
        case "reset":
          return { state: "idle", error: null, data: null };
        default:
          return s;
      }
    },
    initialState || { state: "idle", error: null, data: null },
  );

  return [
    {
      isLoading: store.state === "loading",
      isDone: store.state === "done",
      isError: store.state === "error",
      error: store.error,
      data: store.data,
    },
    {
      start: () => dispatch({ type: "start", payload: null }),
      done: (data: TResponse) => dispatch({ type: "done", payload: data }),
      reset: () => dispatch({ type: "reset", payload: null }),
      error: (error: Error) => dispatch({ type: "error", payload: error }),
    },
  ];
}
