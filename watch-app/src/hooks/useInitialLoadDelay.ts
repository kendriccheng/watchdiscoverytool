import { useEffect, useState } from "react";

const DEFAULT_DELAY_MS = 1000;

export function useInitialLoadDelay(delayMs = DEFAULT_DELAY_MS) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  return isInitialLoading;
}
