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
  return (
    <Backdrop
      onClick={(ev) => {
        if (ev.target === ev.currentTarget && onClose) onClose();
      }}
    >
      <aside
        className={clsx(
          "bg-white ml-auto h-full cursor-default p-6 text-slate-900 rounded-l-2xl drop-shadow-2xl",
          className
        )}
        {...props}
      />
    </Backdrop>
  );
}
