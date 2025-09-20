import { useEffect, useState } from "react";

import clsx from "clsx";

import Backdrop from "./Backdrop";

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  onClose?: () => void;
}

export default function Modal({ onClose, className, ...props }: ModalProps) {
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
      <div
        className={clsx(
          "bg-black border-slate-800 border text-white m-auto min-h-0-20 cursor-default p-8  rounded-xl drop-shadow-2xl",
          "transition-transform duration-100 ease-out",
          !isOpen && "translate-y-10 opacity-0",
          className
        )}
        {...props}
      />
    </Backdrop>
  );
}
