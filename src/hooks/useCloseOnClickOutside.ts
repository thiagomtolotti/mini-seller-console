import { useEffect } from "react";

export default function useCloseOnClickOutside(
  onClose: () => void,
  exceptions: React.RefObject<HTMLElement | null>[]
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const isClickInsideException = exceptions.some((ref) => {
        if (!ref.current) return false;
        return ref.current.contains(event.target as Node);
      });
      if (!isClickInsideException) {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClose, exceptions]);
}
