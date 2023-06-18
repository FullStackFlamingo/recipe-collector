import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
  isPending: boolean;
}

// discriminated union type
type Action<T> = { type: 'pending' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: Error };

export function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    isPending: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'pending':
        return { ...initialState, isPending: true };
      case 'fetched':
        return { ...initialState, data: action.payload, isPending: false };
      case 'error':
        return { ...initialState, error: action.payload, isPending: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'pending' });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data: T = await response.json();
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData();

    //  cleanup function
    return () => {
      cancelRequest.current = true;
    };
  }, [options, url]);

  return state;
}
