import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import clsx from "clsx";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  pending?: boolean;
  variant?: ButtonVariants;
}

type ButtonVariants = "primary" | "secondary";

export default function Button({
  variant = "primary",
  className,
  pending,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariants, string> = {
    primary:
      "bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800",
    secondary: "text-violet-600 hover:bg-violet-700/20 active:bg-violet-800/20",
  };

  return (
    <button
      disabled={pending || props.disabled}
      className={clsx(
        "cursor-pointer px-8 py-2 rounded-lg transition-all ease-in-out duration-300 font-semibold shadow-sm hover:shadow-md active:shadow-lg ",
        "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500",
        pending && "!cursor-progress animate-pulse",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
