import clsx from "clsx";

import Backdrop from "./Backdrop";

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  onClose?: () => void;
}

export default function Modal({ onClose, className, ...props }: ModalProps) {
  return (
    <Backdrop
      onClick={(ev) => {
        if (ev.target === ev.currentTarget && onClose) onClose();
      }}
    >
      <div
        className={clsx(
          "bg-white m-auto min-h-0-20 cursor-default p-8  rounded-xl drop-shadow-2xl",
          className
        )}
        {...props}
      />
    </Backdrop>
  );
}
