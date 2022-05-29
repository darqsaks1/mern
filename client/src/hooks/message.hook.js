import { useCallback } from "react";

export const useMesage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};
