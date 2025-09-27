import { useEffect } from "react";

export default function useLockBodyOverflow() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}
