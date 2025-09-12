import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import clsx from "clsx";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariants;
}

type ButtonVariants = "primary" | "secondary";

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariants, string> = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    secondary: "text-violet-600 hover:bg-violet-50",
  };

  return (
    <button
      className={clsx(
        "cursor-pointer px-8 py-2 rounded-lg transition-all ease-in-out duration-300 font-semibold shadow-sm hover:shadow-md active:shadow-lg",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
