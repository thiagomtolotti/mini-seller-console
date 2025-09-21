import { useEffect, useState } from "react";

import clsx from "clsx";

import Backdrop from "./Backdrop";

interface SlideOverPanelProps extends React.HTMLProps<HTMLDivElement> {
  onClose?: () => void;
}

export default function SlideOverPanel({
  className,
  onClose,
  ...props
}: SlideOverPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Backdrop
      onClick={(ev) => {
        if (ev.target === ev.currentTarget && onClose) onClose();
      }}
    >
      <aside
        className={clsx(
          "bg-black text-slate-50 border border-slate-800 ml-auto h-full cursor-default p-10 rounded-l-2xl drop-shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          !isOpen && "translate-x-full",
          className
        )}
        {...props}
      />
    </Backdrop>
  );
}
