import ReactDOM from "react-dom";
import clsx from "clsx";

export default function Backdrop({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return ReactDOM.createPortal(
    <div
      className={clsx(
        className,
        "fixed inset-0 bg-black/20 flex justify-center items-center cursor-pointer"
      )}
      {...props}
    >
      {children}
    </div>,
    document.documentElement
  );
}
