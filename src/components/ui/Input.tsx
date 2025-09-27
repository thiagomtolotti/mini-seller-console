import clsx from "clsx";

export default function Input({
  className,
  ...props
}: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "border border-slate-300 rounded-md px-3 py-2",
        "disabled:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
