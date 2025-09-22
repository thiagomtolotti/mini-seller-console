interface WithLabelProps {
  label: string;
  children: React.ReactNode;
}

export default function LabelLine({ children, label }: WithLabelProps) {
  const Children = () =>
    typeof children === "string" ? <span>{children}</span> : children;

  return (
    <div className="flex max-md:flex-col gap-2 md:justify-between md:items-center ">
      <span className="font-semibold text-sm">{label}</span>
      <Children />
    </div>
  );
}
